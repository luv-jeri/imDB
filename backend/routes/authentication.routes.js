const express = require('express');
const route = express.Router();

const {
  join,
  login,
  send_reset_OTP,
  check_reset_OTP,
  reset_password,
} = require('../controllers/authentication.controller');

route.post('/join', join);
route.post('/login', login);


route.post('/send-reset-otp', send_reset_OTP);
route.post('/check-reset-otp', check_reset_OTP);
route.post('/reset-password', reset_password);


module.exports = route;
