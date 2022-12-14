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
});

module.exports = UserSchema;
