const User = require('../database/models/user.model');
const catcher = require('../utils/catcher');
const _Error = require('../utils/_error');
const sendMail = require('../utils/mail');

module.exports.join = catcher(async (req, res, next) => {
  const { name, email, password, confirmPassword, photo } = req.body;

  if (password !== confirmPassword)
    return next(new _Error('Password and Confirm Password must be the same', 400));

  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    photo,
  });

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    content: user,
  });
});

module.exports.login = catcher(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return next(new _Error('Email is required to login', 400));

  if (!password) return next(new _Error('Password is required to login', 400));

  const user = await User.findOne({ email });

  if (!user) return next(new _Error('User not found', 404));

  const isCorrectPassword = await user.correctPassword(password);

  if (!isCorrectPassword) return next(new _Error('Email or Password is incorrect', 401));

  const token = user.generateToken();

  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    content: {
      user,
      token,
    },
  });
});

module.exports.send_reset_OTP = catcher(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new _Error('User not found Please check your email.', 404));

  const OTP = user.setOTP();

  await user.save({ validateBeforeSave: false });

  const message = ` Hello,Your OTP is ${OTP} , it will expire in 10 minutes`;

  await sendMail({
    email,
    subject: 'Reset Password OTP',
    message,
  });

  res.status(200).json({
    status: 'success',
    message: 'OTP sent successfully',
  });
});

module.exports.check_reset_OTP = catcher(async (req, res, next) => {
  const { email, OTP } = req.body;

  const user = await User.findOne({
    email,
    OTP,
  });

  if (!user) return next(new _Error('OTP is invalid', 404));

  const resetToken = user.checkOTP(OTP);

  if (!resetToken) return next(new _Error('OTP is invalid or Expired', 404));

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'OTP verified successfully',
    content: {
      resetToken,
    },
  });
});

module.exports.reset_password = catcher(async (req, res, next) => {
  const { resetToken, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return next(new _Error('Password and Confirm Password must be the same', 400));

  const user = await User.findOne({
    resetToken,
  });

  if (!user) return next(new _Error('Reset Token is invalid', 404));

  user.resetPassword(password, confirmPassword);

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Password reset successfully',
  });
});
