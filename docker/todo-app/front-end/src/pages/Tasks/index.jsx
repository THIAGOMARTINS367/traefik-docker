import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ItemAdd from '../../components/ItemAdd';
import ItemList from '../../components/ItemList';
import logo from '../../to-do-list.png';
import './style.css';

function Tasks() {
  const [loggedUser, setLoggedUser] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if (!userToken || !userToken.token) return history.push('/login');
    setLoggedUser(true);
  }, []);

  const logout = () => {
    localStorage.removeItem('userToken');
    return history.push('/login');
  };

  return (
    <section>
      <header className="header-tasks">
        <div className="header-div-username">
          Bem Vindo, Usuário !
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
              <span><h2>Lista das suas Tarefas</h2></span>
              <ItemAdd />
              <ItemList />
            </>)
        }
      </section>
    </section>
  );
}

export default Tasks;
