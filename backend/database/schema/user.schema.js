const { Schema } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, 'Email already'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    // validator : function (password) {
    //   // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    //   return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    // }
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please enter a confirm password'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  photo: { 
    type: String,
  },
  OTP: {
    type: String,
    default: null,
  },
  OTPExpiresIn: {
    type: Date,
    default: null,
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiresIn: {
    type: Date,
    default: null,
  },
});

module.exports = UserSchema;
