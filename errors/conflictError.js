const { CONFLICT_ERROR_CODE } = require('../helpers/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR_CODE;
  }
}

module.exports = ConflictError;
