const jwt = require('jsonwebtoken');

const generateJwtToken = (validity, paylod, superSecret) => {
  const jwtConfig = {
    expiresIn: validity,
    algorithm: 'HS256',
  };
  return jwt.sign({ data: paylod }, superSecret, jwtConfig);
};

module.exports = generateJwtToken;
