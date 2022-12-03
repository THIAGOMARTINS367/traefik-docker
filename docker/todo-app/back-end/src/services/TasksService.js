const taskModel = require('../models/Tasks');

const getAllTasks = async ({ id: userId }) => {
  const tasks = await taskModel.getAllTasks(userId);
  return tasks;
};

const getTask = async ({ id: userId }, id) => {
  const task = await taskModel.getTask(userId, id);
  return task;
};

const addTask = async ({ id: userId }, description) => {
  if (!description) return false;
  const newTask = await taskModel.addTask(userId, description);
  return newTask;
};

const rmTask = async ({ id: userId }, id) => {
  if (!id) return false;
  await taskModel.rmTask(userId, id);
};

const putTask = async (id, description, check) => {
  if (!id) return false;
  if (!description) return false;
  await taskModel.putTask(id, description, check);
};

module.exports = { getAllTasks, getTask, addTask, rmTask, putTask };
