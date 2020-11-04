const bcrypt = require('bcrypt');

const hashPassword = async password => {
  try {
    return bcrypt.hash(password, 6);
  } catch (error) {
    throw new Error(error);
  }
};

const checkHashedPassword = async (password, hash) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  hashPassword,
  checkHashedPassword
};
