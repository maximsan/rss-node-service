const mongoose = require('mongoose');

const createNewUser = () => {
  return new User();
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
  mapUser,
  toResponse
};
