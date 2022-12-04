import React from 'react';
import ItemAdd from '../../components/ItemAdd';
import ItemList from '../../components/ItemList';
import logo from '../../logo.png';
import './style.css';

function Tasks() {
  return (
    <section className="section-todo-list">
      <img src={logo} className="logo" alt="logo" />
      <span><h2>Trybe Todo List</h2></span>
      <ItemAdd />
      <ItemList />
    </section>
  );
}

export default Tasks;
