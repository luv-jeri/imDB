const express = require('express');
const error_handler = require('./utils/error_handler');
const app = express();
const cors = require('cors');

const origin = ['http://localhost:3000/'];

//* to add cookies if CORS
app.use(
  cors({
    origin,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://456:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', true);

  next();
});

app.use(express.json());

app.use('/api/v1', require('./routes'));

app.use(error_handler);

app.all('*', (req, res, next) => {
  next(new _Error(`Can't find ${req.originalUrl} on this server :(`, 404));
});

module.exports = app;
