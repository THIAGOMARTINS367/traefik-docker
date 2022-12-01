const taskModel = require('../models/Tasks');
const taskService = require('../services/TasksService');

const getAllTasks = async (_req, res) => taskService
  .getAllTasks()
    .then((tasks)=> res.status(200).json(tasks))
    .catch((error)=> {
      console.error(error);
      res.status(500).end()
    });

const getTask = (req, res) => taskService
  .getTask(req.params.id)
    .then((task)=> res.status(200).json(task))
    .catch((error)=> {
      console.error(error);
      res.status(500).end()
    });

const addTask = (req, res) => taskService
  .addTask(req.body.description)
    .then((addedTask)=> res.status(200).json(addedTask))
    .catch((error)=> {
      console.error(error);
      res.status(500).end()
    });

const rmTask = (req, res) => taskService
  .rmTask(req.params.id)
    .then(()=> res.status(204).end())
    .catch((error)=> {
      console.error(error);
      res.status(500).end()
    });

const putTask = ({ params, body }, res) => taskModel
  .putTask(params.id, body.description, body.check)
    .then(()=> res.status(204).end())
    .catch((error)=> {
      console.error(error);
      res.status(500).end()
    });

const resetTasks = (_req, res) => taskModel
  .resetTasks()
    .then(()=> res.status(204).end())
    .catch((error)=> {
      console.error(error);
      res.status(500).end()
    });

module.exports = {
  getAllTasks,
  getTask,
  addTask,
  rmTask,
  putTask,
  resetTasks
}
