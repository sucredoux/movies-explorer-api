const { MONGO_DUPLICATE } = require('../constants/status');

class MongoDuplicateErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = MONGO_DUPLICATE;
  }
}

module.exports = MongoDuplicateErr;
