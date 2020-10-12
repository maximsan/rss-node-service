const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

const createNewUser = () => {
  return new User();
};

const mapUser = ({ name, login, password }) => {
  return new User({ name, login, password });
};

module.exports = {
  User,
  createNewUser,
  mapUser
};
