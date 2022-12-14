const express = require('express');
const error_handler = require('./utils/error_handler');
const app = express();

app.use(express.json());

app.use('/api/v1', require('./routes'));

app.use(error_handler);

app.all('*', (req, res, next) => {
  next(new _Error(`Can't find ${req.originalUrl} on this server :(`, 404));
});

module.exports = app;
