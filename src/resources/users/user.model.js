const mongoose = require('mongoose');
const { hashPassword } = require('../../common/hashHelpers');

const createNewUser = (name, login, password) => {
  return new User({ name, login, password });
};

const createUserWithHashedPassword = async (name, login, password) => {
  const hashedPassword = await hashPassword(password);
  return { name, login, password: hashedPassword };
};

const mapUser = ({ name, login, password }) => {
  return new User({ name, login, password });
};

const toResponse = ({ id, name, login }) => {
  return { id, name, login };
};

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String
  },
  { collection: 'users' }
);

const User = mongoose.model('users', userSchema);

module.exports = {
  User,
  createNewUser,
  createUserWithHashedPassword,
  mapUser,
  toResponse
};
