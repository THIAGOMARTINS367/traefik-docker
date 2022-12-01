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
  if(!id) return false;
  
  const tasks = await getAllTasks();
  const newTaskList = tasks.map(item => {
    if (item.id !== id) {
      return item;
    } else {
      return {
        ...item,
        description: description || item.description,
        check: check !== undefined ? check : item.check
      }
    }
  });

  writeFile(`${jsonDBPath}tasks.json`, JSON.stringify(newTaskList, 0, 2));

  return true
}

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
