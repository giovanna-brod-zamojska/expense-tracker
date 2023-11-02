const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter you name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please, enter your email address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default-user.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  monthlyBudget: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only work on create() and save()! And not on patch requests
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password do not match',
    },
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  refreshToken: { tyep: String, select: false },
});

// comment those two following pieces when importing users from dev-data in dev mode
userSchema.pre('save', async function (next) {
  // only run if password was actually modify
  if (!this.isModified('password')) return next(); // go to next middleware
  // hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete password confirm since we do not more need it
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; // -1second: ensures token is created after password has been changed
  next();
});

userSchema.pre(/^find/, function (next) {
  //this points to current query that starts with: find
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // user has changed password
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return changedTimeStamp >= JWTTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
