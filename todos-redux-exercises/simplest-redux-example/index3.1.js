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

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => {return(
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
)};

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => {
        store.dispatch({
          type: 'INCREMENT'
        })
      }}
      onDecrement={() => {
        store.dispatch({
          type: 'DECREMENT'
        })
      }}
      />,
      document.getElementById('root')
  )
}
store.subscribe(render);
render();
