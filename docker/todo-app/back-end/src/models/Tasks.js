const { connection } = require('./connection');
const { readFile, writeFile } = require('../utils/fileHandler');

const jsonDBPath = "./src/database/";

const getAllTasks = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM todo_list ORDER BY id',
  );
  return result;
};

const getTask = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM todo_list WHERE id = ?',
    [id]
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

const resetTasks = async () => {
  const bkpTasks = await readFile(`${jsonDBPath}tasks.bkp.json`)
    .then((file)=> JSON.parse(file))
    .catch(({ message })=> new Error(`Não foi possível consultar o banco de dados:\n${message}`));

  writeFile(`${jsonDBPath}tasks.json`, JSON.stringify(bkpTasks, 0, 2));

  return true
}

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  rmTask,
  putTask,
  resetTasks
}
