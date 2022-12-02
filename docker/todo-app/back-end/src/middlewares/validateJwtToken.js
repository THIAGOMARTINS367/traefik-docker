const jwt = require('jsonwebtoken');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return next({ code: 401, message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { ...decoded };
    next();
  } catch (error) {
    next({ code: 401, message: 'Expired or invalid token' });
  }
};
