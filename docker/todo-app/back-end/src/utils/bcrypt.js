const bcrypt = require("bcrypt");

const encode = (password) => {
  const salt = bcrypt.genSaltSync(7);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const validateHash = (password, hash) => {
  const validation = bcrypt.compareSync(password, hash);
  return validation;
};

module.exports = { encode, validateHash };
