class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    this.message = message;
  }
}

module.exports = {
  NotFoundError,
  ForbiddenError
};
