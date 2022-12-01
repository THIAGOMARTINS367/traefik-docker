const taskModel = require("../models/Tasks");

const getAllTasks = async () => {
  const tasks = await taskModel.getAllTasks();
  return tasks;
};

const getTask = async (id) => {
  const task = await taskModel.getTask(id);
  return task;
};

const addTask = async (description) => {
  if (!description) return false;
  const newTask = await taskModel.addTask(description);
  return newTask;
};

const rmTask = async (id) => {
  if (!id) return false;
  await taskModel.rmTask(id);
};

const putTask = async (id, description, check) => {
  if (!id) return false;
  if (!description) return false;
  await taskModel.putTask(id, description, check);
};

module.exports = { getAllTasks, getTask, addTask, rmTask, putTask };
