import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import taskApi from '../utils/fetch';

const TaskContext = createContext();

export function TaskProvider ({ children }) {
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  const getTasks = async (headers) => taskApi('GET', 'tasks', {}, headers)
    .then(({ data: tasks }) => setTasks(tasks))
    .catch((error) => {
      console.error(error.response.data.message);
      if (error.response.status === 401) {
        localStorage.removeItem('userToken');
        return history.push('/login');
      };
    });

  const getTask = async (id) => taskApi('GET', `task/${id}`)
    .then(({ data: task }) => task);

  const addTask = async (description) => taskApi('POST', 'task', { description })
    .then(getTasks);

  const rmTask = async (id) => taskApi('DELETE', `task/${id}`)
    .then(getTasks);

  const putTask = async (id, description, check) => taskApi('PUT', `task/${id}`, { description, check })
    .then(getTasks);
  
  const resetTasks = async () => taskApi('POST', 'debug')
    .then(()=>true)
    .catch(()=>console.error('Não foi possível restaurar as tarefas'));

  const contextValue = {
    tasks,
    getTasks,
    getTask,
    addTask,
    rmTask,
    putTask,
    resetTasks
  };

  return (
    <TaskContext.Provider value={ contextValue }>
      { children }
    </TaskContext.Provider>
  );
}

export default TaskContext;
