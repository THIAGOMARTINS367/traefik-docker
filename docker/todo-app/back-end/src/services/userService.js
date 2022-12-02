const Joi = require('joi');
const bcrypt = require('../utils/bcrypt');
const userModel = require('../models/userModel');
const generateJwtToken = require('../utils/generateJwtToken');

const validateAddNewUserFields = ({ fullName, email, password }) => {
  const { error } = Joi.object({
    fullName: Joi.string().not().empty().min(8)
      .required(),
    email: Joi.string().not().empty().email()
      .required(),
    password: Joi.string().not().empty().min(6)
      .required(),
  }).validate({ fullName, email, password });
  return error;
};

const getUserByEmail = async (email) => {
  const user = await userModel.getUserByEmail(email);
  return user;
};

const addNewUser = async (body) => {
  const validation = validateAddNewUserFields(body);
  if (validation) {
    return { error: { code: 400, message: validation.message } };
  }
  const { fullName, email, password } = body;
  const userExists = await getUserByEmail(email);
  if (userExists.length > 0) {
    return { error: { code: 409, message: 'User already registered' } };
  }
  const passwordHash = bcrypt.encode(password);
  const newUser = await userModel.addNewUser(fullName, email, passwordHash);
  const payload = { ...newUser };
  delete payload.passwordHash;
  const token = generateJwtToken('7d', payload, process.env.JWT_SECRET);
  return { token };
};

module.exports = { addNewUser };
