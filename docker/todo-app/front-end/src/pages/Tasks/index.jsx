import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ItemAdd from '../../components/ItemAdd';
import ItemList from '../../components/ItemList';
import logo from '../../logo.png';
import './style.css';

function Tasks() {
  const [loggedUser, setLoggedUser] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if (!userToken || !userToken.token) return history.push('/login');
    setLoggedUser(true);
  }, []);
  return (
    <section className="section-todo-list">
      {
        loggedUser && (
          <>
            <img src={ logo } className="logo" alt="logo" />
            <span><h2>Trybe Todo List</h2></span>
            <ItemAdd />
            <ItemList />
          </>)
      }
    </section>
  );
}

export default Tasks;
