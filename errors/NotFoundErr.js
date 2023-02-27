const { NOT_FOUND } = require('../constants/status');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFoundErr;
