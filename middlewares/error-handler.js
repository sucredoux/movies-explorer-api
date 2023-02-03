const { SERVER_ERROR } = require('../constants/messages');
const { SERVER_CODE } = require('../constants/status');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || SERVER_CODE;
  const message = err.message || SERVER_ERROR;

  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
