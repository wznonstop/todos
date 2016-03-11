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

// const { combineReducers } = Redux;
// import {
//   combineReducers
// }
// from 'redux'

//其实并不懂！！！
const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                nextState[key] = reducers[key](
                    state[key],
                    action
                );
                return nextState;
            },
            {}
        )
    }
}



//第三版：基于es6
const todoApp = combineReducers({
    todos,
    visibilityFilter
});


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
alert(1);