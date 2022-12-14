import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import taskApi from '../utils/fetch';

const TaskContext = createContext();

export function TaskProvider ({ children }) {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  const authUserToken = (statusCode) => {
    if (statusCode === 401) {
      localStorage.removeItem('userToken');
      return history.push('/login');
    };
  }

  const getTasks = (headers) => taskApi('GET', 'tasks', {}, headers)
    .then(({ data: tasks }) => setTasks(tasks))
    .catch((error) => {
      console.error('error:', error);
      console.error('JSON.stringify(error):', JSON.stringify(error));
      console.error('error.response:', error.response);
      if (error.response) {
        console.error(error.response.data.message);
        authUserToken(error.response.status);
      } else {
        console.error('ERROR: GET /tasks: failed to get tasks');
      }
    });

  const getTask = (id, headers) => taskApi('GET', `task/${id}`, {}, headers)
    .then(({ data: task }) => task)
    .catch((error) => {
      if (error.response) {
        console.error(error.response.data.message);
        authUserToken(error.response.status);
      } else {
        console.error(`ERROR: GET /task/${id}: failed to get task`);
      }
    });

  const addTask = async (description, headers) => taskApi('POST', 'task', { description }, headers)
    .then(() => getTasks(headers))
    .catch((error) => {
      console.error(error.response.data.message);
      authUserToken(error.response.status);
    });

  const rmTask = async (id, headers) => taskApi('DELETE', `task/${id}`, {}, headers)
    .then(() => getTasks(headers))
    .catch((error) => {
      console.error(error.response.data.message);
      authUserToken(error.response.status);
    });

  const putTask = async (id, description, check, headers) => taskApi('PUT', `task/${id}`, { description, check }, headers)
    .then(() => getTasks(headers))
    .catch((error) => {
      console.error(error.response.data.message);
      authUserToken(error.response.status);
    });
  
  const resetTasks = async (headers) => taskApi('POST', 'debug', {}, headers)
    .then(()=>true)
    .catch(()=>console.error('Não foi possível restaurar as tarefas'));

  const contextValue = {
    tasks,
    getTasks,
    getTask,
    addTask,
    rmTask,
    putTask,
    resetTasks,
  };

  return (
    <TaskContext.Provider value={ contextValue }>
      { children }
    </TaskContext.Provider>
  );
}

export default TaskContext;
