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


// const { createStore } = Redux;
//var createStore = Redux.createStore;
//import { creatStore } from 'redux';



const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);
const render = () => {
  //getState是获取当前状态的
  document.body.innerText = store.getState();
}

//subscribe订阅状态的改变，并用当前最新的状态去重新渲染页面
store.subscribe(render);
render();

document.addEventListener('click',() => {
  //dispatch是改变当前状态的。dispatch和action是唯一能改变状态的东西
  store.dispatch({ type: 'INCREMENT' });
})