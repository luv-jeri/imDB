const User = require('../database/models/user.model');
const catcher = require('../utils/catcher');
const _Error = require('../utils/_error');
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
