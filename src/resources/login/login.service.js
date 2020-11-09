const jwt = require('jsonwebtoken');
const { logError } = require('../../common/logger');
const { checkHashedPassword } = require('../../common/hashHelpers');
const { ForbiddenError } = require('../../common/customErrors');

class LoginService {
  constructor(repository) {
    this.repository = repository;
  }

  async createJwtToken(params) {
    const loggedUser = await this.repository.findByParams(params);

    if (!loggedUser) {
      logError('User not found. Incorrect login or password');
      throw new ForbiddenError('User not found. Incorrect login or password');
    }

    const { userId, login, password } = loggedUser;

    const isValid = await checkHashedPassword(params.password, password);

    if (isValid) {
      return jwt.sign({ userId, login }, process.env.JWT_SECRET_KEY);
    }

    logError('Passwords are not matched. Incorrect login or password');
    throw new ForbiddenError(
      'Passwords are not matched. Incorrect login or password'
    );
  }
}

module.exports = LoginService;
