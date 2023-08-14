const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const { USER_UNAUTHORIZED_MESSAGE } = require('../helpers/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  let token;
  let payload;

  try {
    token = req.cookies.jwt;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(USER_UNAUTHORIZED_MESSAGE);
  }

  req.user = payload;

  return next();
};
