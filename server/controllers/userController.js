const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const path = require('path');
const fs = require('fs');

/* const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
}); */

const multerFilter = (req, file, cb) => {
  console.log('Req file: ' + file.mimetype);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

exports.uploadUserPhoto = multer({
  storage: multer.memoryStorage(),
  fileFilter: multerFilter,
}).single('photo');

exports.resizeUserPhoto = (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}.jpeg`;
  sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

exports.getUserPhoto = (req, res) => {
  const requestedPhoto = req.params.photo;
  const imagePath = path.join(__dirname, '../public/img/users', requestedPhoto);

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    const defaultPhotoPath = path.join(
      __dirname,
      '../public/img/users/default-user.jpg',
    );
    res.sendFile(defaultPhotoPath);
  }
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create err if user post password
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Please use /updatePassword', 400));
  }
  console.log(req.body);
  // 2) update user only if allowed body attributes
  const filteredBody = filterObj(req.body, 'name', 'email', 'monthlyBudget');
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  updatedUser.refreshToken = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
}); /*
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Please use /updatePassword', 400));
  }

  const filteredBody = filterObj(req.body, 'name', 'email', 'monthlyBudget');
  if (req.file) filteredBody.photo = req.file.filename;
  console.log(req.body.monthlyBudget);

  if (filteredBody.monthlyBudget) {
    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body.monthlyBudget,
      {
        new: true, // This ensures that you get the updated document as a result
        runValidators: true,
      },
    );
    updatedUser.refreshToken = undefined;
    console.log(updatedUser);

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } else {
    // If budgetCategory is not provided in the request, just update other fields
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true, // This ensures that you get the updated document as a result
        runValidators: true,
      },
    );
    updatedUser.refreshToken = undefined;
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  }
});*/

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    message: 'User deleted',
  });
});
