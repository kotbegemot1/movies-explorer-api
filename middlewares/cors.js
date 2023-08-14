const {
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
  ALLOWED_HEADERS,
} = require('../helpers/constants');

const cors = (req, res, next) => {
  const { origin } = req.headers;

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', ALLOWED_HEADERS);
  res.header('Access-Control-Allow-Credentials', true);

  const { method } = req;

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }

  return next();
};

module.exports = {
  cors,
};
