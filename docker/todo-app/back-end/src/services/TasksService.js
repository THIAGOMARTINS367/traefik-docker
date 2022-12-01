const taskModel = require("../models/Tasks");

const getAllTasks = async () => {
  const tasks = await taskModel.getAllTasks();
  return tasks;
};

const getTask = async (id) => {
  const task = await taskModel.getTask(id);
  return task;
};

module.exports = { getAllTasks, getTask };
