const userService = require('../services/userService');

const addNewUser = async (req, res, next) => {
  const token = await userService.addNewUser(req.body);
  if (token.error) {
    return next(token.error);
  }
  res.status(200).json(token);
};

module.exports = { addNewUser }
