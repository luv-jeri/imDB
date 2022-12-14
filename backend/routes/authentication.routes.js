const express = require('express');
const route = express.Router();

const { join, login } = require('../controllers/authentication.controller');

route.post('/join', join);
route.post('/login', login);

module.exports = route;
