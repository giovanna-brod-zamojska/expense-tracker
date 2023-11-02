const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');

const signToken = (id, username, role, superSecretKey, expires) => {
  const token = jwt.sign({ id, username, role }, superSecretKey, {
    expiresIn: expires,
  });
  return token;
};

const sendAccessAndRefresh = async (user, statusCode, req, res) => {
  const accessToken = signToken(
    user._id,
    user.name,
    user.role,
    process.env.ACCESS_TOKEN_SECRET,
    '10m',
  );
  const refreshToken = signToken(
    user._id,
    user.name,
    user.role,
    process.env.REFRESH_TOKEN_SECRET,
    '90d',
  );

  // ATTACH REFRESH TOKEN TO USER in DB
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      refreshToken: refreshToken,
    },
    { new: true },
  );
  updatedUser.password = undefined;
  updatedUser.refreshToken = undefined;

  res.cookie('jwt', refreshToken, {
    path: '/',
    httpOnly: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, //90day
    secure: false,
    //secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  res.status(statusCode).json({
    status: 'success',
    accessToken,
    data: {
      user: updatedUser,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  //const url = `${req.protocol}://${req.get('host')}/me`;
  //await new Email(newUser, url).sendWelcome();

  // send ACCESS TOKEN and REFRESH TOKEN
  sendAccessAndRefresh(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // send ACCESS TOKEN and REFRESH TOKEN
  await sendAccessAndRefresh(user, 200, req, res);
});

// REFRESH ACCESS TOKEN
exports.refreshAccessToken = catchAsync(async (req, res) => {
  // IF REFRESH TOKEN IN COOKIE
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // cannot refresh accessToken without refreshToken
  // VERIFY REFRESH TOKEN VALIDITY
  const refreshToken = cookies.jwt;
  const decoded = await promisify(jwt.verify)(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );
  // RETRIEVE USER BELONGING TO VALID REFRESH TOKEN
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    // IF REFRESH VERIFIED BUT USER NOT FOUND
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }
  // IF FOUND USER BELONGING TO A VALID REFRESH TOKEN, THEN SEND A NEW ACCESS TOKEN
  const newAccessToken = signToken(
    currentUser._id,
    currentUser.name,
    currentUser.role,
    process.env.ACCESS_TOKEN_SECRET,
    '10m',
  );
  res.status(200).json({
    status: 'success',
    accessToken: newAccessToken,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } /*else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } */
  // IF NOT, UNAUTHORIZED
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }

  // RETRIEVE USER FROM jwt decoding
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET,
  );
  // IS USER IN DB?
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }
  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401),
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// NO BEARER AUTH, ONLY NEEDS REFRESH TOKEN
exports.logout = async (req, res) => {
  // on client delete also access token

  // is there cookie with refresh token?
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  // is refreshToken in DB?
  const refreshToken = cookies.jwt;

  const currentUser = await User.findOne({ refreshToken: refreshToken });
  //if not user in db clear refresh token cookie
  if (!currentUser) {
    res.clearCookie('jwt', { path: '/', httpOnly: true });
    return res.sendStatus(204);
  }

  // we did find the refresh token associated with the user, so we delete the refresh token from the user
  const userWithoutRefreshToken = await User.findByIdAndUpdate(
    currentUser.id,
    {
      refreshToken: '',
    },
    { new: true },
  );
  res.cookie('jwt', '', {
    path: '/',
    httpOnly: true,
    secure: false,
    //sameSite: 'None',
  });

  res.status(201).json({ message: 'Logged out' });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!
  res.status(200).json({
    status: 'success',
    message: 'Password updated.',
  });
  // 4) Log user in, send JWT
  //createSendToken(user, 200, req, res);
});
