const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../constants/config');
const { AUTH_NEEDED } = require('../constants/messages');
const { AuthErr } = require('../errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthErr(AUTH_NEEDED);
  }
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    throw new AuthErr(AUTH_NEEDED);
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      throw new AuthErr(AUTH_NEEDED);
    } else {
      next(err);
    }
  }
  req.user = payload;
  next();
};

module.exports = auth;
