const { logError } = require('./logger');
const { NotFoundError } = require('./customErrors');
const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
    logError(err, req.originalUrl, req.method);
    return;
  }

  if (err) {
    res.status(500).send('Something gone wrong');
    logError(err, req.originalUrl, req.method);
  }

  next();
};

module.exports = errorHandler;
