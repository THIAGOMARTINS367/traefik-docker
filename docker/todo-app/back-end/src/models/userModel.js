const { connection } = require('./connection');

const getUserByEmail = async (email) => {
  const [result] = await connection.execute(
    'SELECT * FROM user WHERE email = ?',
    [email]
  );
  return result;
};

const addNewUser = async (fullName, email, passwordHash) => {
  const [result] = await connection.execute(
    'INSERT INTO user (fullname, email, password) VALUES (?, ?, ?)',
    [fullName, email, passwordHash]
  );
  return {
    id: result.insertId,
    fullName,
    email,
    passwordHash,
  }
};

module.exports = { addNewUser, getUserByEmail };
