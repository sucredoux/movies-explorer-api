const { AUTH } = require('../constants/status');

class AuthErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTH;
  }
}

module.exports = AuthErr;
