const taskModel = require("../models/Tasks");

const getAllTasks = async () => {
  const tasks = await taskModel.getAllTasks();
  return tasks;
};

module.exports = { getAllTasks };
