const jwt = require('jsonwebtoken');
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

    const { userId, login } = loggedUser;

    return jwt.sign({ userId, login }, process.env.JWT_SECRET_KEY);
  }
}

module.exports = LoginService;
