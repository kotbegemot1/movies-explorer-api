const { SERVER_ERROR_MESSAGE } = require('../helpers/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERROR_MESSAGE
        : message,
    });
  return next();
};

module.exports = {
  errorHandler,
};
