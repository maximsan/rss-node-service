const { winstonLogger } = require('./logger');
const { NotFoundError } = require('./customErrors');
const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
    winstonLogger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
    return;
  }

  if (err) {
    res.status(500).send('Something gone wrong');
    winstonLogger.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );
  }

  next();
};

module.exports = errorHandler;
