const { ForbiddenError } = require('./customErrors');
const { logError } = require('./logger');
const { NotFoundError } = require('./customErrors');
const {
  NOT_FOUND,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  getReasonPhrase
  // eslint-disable-next-line node/no-unpublished-require
} = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(NOT_FOUND).send(err.message);
    logError(err, req.originalUrl, req.method);
    return;
  }

  if (err instanceof ForbiddenError) {
    res.status(FORBIDDEN).send(getReasonPhrase(FORBIDDEN));
    logError(err, req.originalUrl, req.method);
    return;
  }

  if (err) {
    res.status(INTERNAL_SERVER_ERROR).send('Something gone wrong');
    logError(err, req.originalUrl, req.method);
  }

  next();
};

module.exports = errorHandler;
