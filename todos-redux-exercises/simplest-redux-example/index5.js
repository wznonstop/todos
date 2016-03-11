import React, {
  PropTypes
}
from 'react'
import ReactDOM from 'react-dom'
import {
  createStore
}
from 'redux'
import {
  Provider, connect
}
from 'react-redux'


const toggleTodo = (todo) => {
  // todo.completed = !todo.completed;
  // return todo;

  // return {
  //   id: todo.id,
  //   text: todo.text,
  //   completed: !todo.completed
  // };

  //es6,Object.assign是es6的新属性
  return Object.assign({}, todo, {
    completed: !todo.completed
  });

  //es7
  // return {
  //   ...todo,
  //   completed: !todo.completed
  // };
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true
  };

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
    ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');


