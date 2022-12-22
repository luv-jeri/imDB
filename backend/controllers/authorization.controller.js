const jwt = require('jsonwebtoken');
const _Error = require('../utils/_error');

module.exports.authorize = (req, res, next) => {
  const { auth } = req.cookies;

  if (!auth) return next(new _Error('You are not logged in', 401));

  const decoded = jwt.verify(auth, process.env.JWT_SECRET);

  if (!decoded) return next(new _Error('Please re-login', 401));

  req.user = decoded;

  next();
};
