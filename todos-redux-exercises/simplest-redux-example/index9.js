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

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO': 
            if(state.id !== action.id) {
                return state;
            };

            return {
                ...state,
                completed: !state.completed
            };
        default: 
            return state;
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];

        case 'TOGGLE_TODO': 
            return state.map(t => todo(t, action));

        //每个reducer都一定要返回状态值，
        default: 
            return state;
    }
};

const visibilityFilter = (
        state = 'SHOW_ALL',
        action
    ) => {
        switch (action.type) {
            case 'SET_VISIBILITY_FILTER':
                return action.filter;
            default:
                return state;
        }
}

//todoApp 作为一个 store, 在它里面定义的东西决定了最终呈现在 state 里面的数据的结构。此处就是分为两个属性: todos,visibilityFilter
//最开始的时候 state 是空的。，因此，state.todos ， state.visibilityFilter 都是！ undefined, 因此， todos 和 visibilityFilter 这两个函数的参数都被赋了初始值，初始值的意义就在于，接收到 undefined 时，首先不报错，同时，用初始值代替传进来的 undefined，执行后续操作
const todoApp = (state = {}, action) => {
    return {
        todos: todos(
            state.todos,
            action
        ),
        visibilityFilter: visibilityFilter(
            state.visibilityFilter,
            action
        )
    }
}

const store = createStore(todoApp);

console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO.');
store.dispatch({
    type: 'ADD_TODO',
    id: 1, 
    text: 'Go shopping'
})

console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('SET_VISIBILITY_FILTER.');
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');