const { FORBIDDEN } = require('../constants/status');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

module.exports = ForbiddenErr;
