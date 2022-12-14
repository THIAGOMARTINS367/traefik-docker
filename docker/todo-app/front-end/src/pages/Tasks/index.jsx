import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ItemAdd from '../../components/ItemAdd';
import ItemList from '../../components/ItemList';
import TaskContext from '../../context/taskContext';
import logo from '../../to-do-list.png';
import './style.css';

function Tasks() {
  const [loggedUser, setLoggedUser] = useState(false);
  const [userName, setUserName] = useState('');
  const { loadingTasks, setLoadingTasks } = useContext(TaskContext);
  const history = useHistory();

  useEffect(() => {
    setLoadingTasks('Carregando...');
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if (!userToken || !userToken.token) return history.push('/login');
    setLoggedUser(true);
    const formattedUsername = userToken.userName.split(' ')[0];
    setUserName(formattedUsername);
  }, []);

  const logout = () => {
    localStorage.removeItem('userToken');
    return history.push('/login');
  };

  return (
    <section className="section-page-tasks">
      <header className="header-tasks">
        <div className="header-div-username">
          Bem Vindo, { userName } !
        </div>
        <div>
          <button type="button" className="header-button-logout" onClick={ logout }>
            Sair
          </button>
        </div>
      </header>
      <section className="section-todo-list">
        {
          loggedUser && (
            <>
              <div className="div-img-logo">
                <img src={ logo } className="logo" alt="logo" />
              </div>
              <span><h2>Suas Tarefas</h2></span>
              <ItemAdd />
              <div className="div-loading-tasks">{ loadingTasks }</div>
              <ItemList />
            </>)
        }
      </section>
    </section>
  );
}

export default Tasks;
