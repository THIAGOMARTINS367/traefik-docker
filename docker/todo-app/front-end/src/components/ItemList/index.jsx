import React, { useContext, useEffect } from 'react';
import TaskContext from '../../context/taskContext';
import ItemRow from '../ItemRow/index';
import './styles.css';

function ItemList() {
  const {
    tasks,
    getTasks,
  } = useContext(TaskContext);

  useEffect(()=>{
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    getTasks({ authorization: userToken.token });
  }, []);

  // useEffect(()=>{
  //   if(tasks.length === 0){
  //     const userToken = JSON.parse(localStorage.getItem('userToken'));
  //     setTimeout(() => getTasks({ authorization: userToken.token }), 5000);
  //   }
  // }, [tasks, getTasks]);

  return (
    <div
      data-testid="todo-task-list"
      className="item-list"
    >
      {
        tasks.length > 0 && tasks
          .map(({ id, description, check }, index) => (
            <ItemRow 
              key={`${index}${Date.now()}`}
              index={index}
              id={id} 
              description={description} 
              check={check} 
            />
          ))
      }
    </div>
  );
}

export default ItemList;
