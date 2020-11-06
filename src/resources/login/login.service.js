const jwt = require('jsonwebtoken');
const { checkHashedPassword } = require('../../common/hashHelpers');
const { ForbiddenError } = require('../../common/customErrors');

class LoginService {
  constructor(repository) {
    this.repository = repository;
  }

  async createJwtToken(params) {
    const loggedUser = await this.repository.findByParams(params);

    if (!loggedUser) {
      throw new ForbiddenError();
    }

    const { userId, login, password } = loggedUser;

    const isValid = checkHashedPassword(params.password, password);

    if (isValid) {
      return jwt.sign({ userId, login }, process.env.JWT_SECRET_KEY);
    }
  }
}

module.exports = LoginService;
