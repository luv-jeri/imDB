const express = require('express');
const error_handler = require('./utils/error_handler');
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const _Error = require('./utils/_error');
const origin = ['http://localhost:3000'];
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000,
  })
);

// app.use(
//   express.json({
//     limit: '1mb',
//   })
// );

//* to add cookies if CORS
app.use(
  cors({
    origin,
    credentials: true,
  })
);

app.use(compression());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://456:3000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('Access-Control-Allow-Credentials', true);

//   next();
// });

app.use(express.json());

app.use('/api/v1', require('./routes'));

app.use(error_handler);

app.all('*', (req, res, next) => {
  next(new _Error(`Can't find ${req.originalUrl} on this server :(`, 404));
});

module.exports = app;
