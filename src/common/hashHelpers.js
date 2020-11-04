const bcrypt = require('bcrypt');

const hashPassword = async password => {
  return bcrypt.hash(password, 6);
};

const checkHashedPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkHashedPassword
};
