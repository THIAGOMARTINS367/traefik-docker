const { connection } = require('./connection');

const getAllTasks = async (userId) => {
  const [result] = await connection.execute(
    'SELECT * FROM todo_list WHERE user_id = ? ORDER BY id',
    [userId],
  );
  return result;
};

const getTask = async (userId, id) => {
  const [result] = await connection.execute(
    'SELECT * FROM todo_list WHERE user_id = ? AND id = ?',
    [userId, id]
  );
  return result;
};

const addTask = async (description) => {
  const [result] = await connection.execute(
    'INSERT INTO todo_list (description, `check`) VALUES (?, ?)',
    [description, false],
  );
  return {
    id: result.insertId,
    description,
    check: false,
  };
};

const rmTask = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM todo_list WHERE id = ?',
    [id],
  );
  return result.affectedRows;
};

const putTask = async (id, description, check) => {
  const [result] = await connection.execute(
    'UPDATE todo_list SET description = ?, `check` = ? WHERE id = ?',
    [description, check, id],
  );
  return result.changedRows;
};

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  rmTask,
  putTask,
}
