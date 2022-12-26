const UserSchema = require('../schema/user.schema');
const { model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

UserSchema.methods.correctPassword = async function (user_password) {
  return await bcrypt.compare(user_password, this.password);
};

UserSchema.methods.generateToken = function (res) {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('auth', token, {
    httpOnly: true,
  });

  return token;
};

UserSchema.methods.setOTP = function () {
  const OTP = Math.floor(100000 + Math.random() * 900000);

  this.OTP = OTP;
  this.OTPExpiresIn = Date.now() + 10 * 60 * 1000;

  this.resetToken = null;
  this.resetTokenExpiresIn = null;

  return OTP;
};

UserSchema.methods.checkOTP = function (OTP) {
  this.resetToken = null;
  this.resetTokenExpiresIn = null;

  console.log(this.OTP, OTP);

  if (this.OTP !== OTP) return false;
  if (this.OTPExpiresIn < Date.now()) return false;

  const resetToken = crypto.randomBytes(32).toString('hex');

  this.resetToken = resetToken;
  this.resetTokenExpiresIn = Date.now() + 3 * 60 * 1000;

  return resetToken;
};

UserSchema.methods.resetPassword = async function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;

  this.OTP = null;
  this.OTPExpiresIn = null;
  this.resetToken = null;
  this.resetTokenExpiresIn = null;
};

UserSchema.methods.logout = function (res) {
  res.clearCookie('auth');
}

const UserModel = model('user', UserSchema);

module.exports = UserModel;
