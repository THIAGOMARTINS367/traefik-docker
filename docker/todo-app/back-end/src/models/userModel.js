const { connection } = require('./connection');

const getUserByEmail = async (email) => {
  const [result] = await connection.execute(
    'SELECT * FROM user WHERE email = ?',
    [email]
  );
  if (result.length > 0) {
    const userObj = result[0];
    const id = userObj['user_id'];
    delete userObj['user_id'];
    return [
      {
        id,
        ...userObj,
      },
    ];
  }
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
