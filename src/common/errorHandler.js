const { NotFoundError } = require('./customErrors');
const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).send('Something gone wrong');
  }
  if (err instanceof NotFoundError) {
    res.status(404).send(err.message);
  }
  next();
};

module.exports = errorHandler;
