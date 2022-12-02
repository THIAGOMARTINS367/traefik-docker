const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorMiddleware = require('../middlewares/error');
const validateJwtToken = require('../middlewares/validateJwtToken');

const routes = express();

const tasksController = require('../controllers/Tasks');

const userController = require('../controllers/userController');

routes.use(cors());
routes.use(express.json());
routes.use(morgan('tiny'));

routes.post("/registration", userController.addNewUser);
routes.post("/login", userController.userLogin);

routes.get("/tasks", validateJwtToken, tasksController.getAllTasks);
routes.post("/task", validateJwtToken, tasksController.addTask);
routes.get("/task/:id", validateJwtToken, tasksController.getTask);
routes.delete("/task/:id", validateJwtToken, tasksController.rmTask);
routes.put("/task/:id", validateJwtToken, tasksController.putTask);

routes.use(errorMiddleware);

module.exports = routes;
