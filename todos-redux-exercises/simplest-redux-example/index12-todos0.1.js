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
import {
  combineReducers
}
from 'redux'

//第三版：基于es6
const todoApp = combineReducers({
    todos,
    visibilityFilter
});


const store = createStore(todoApp);

const { Component } = React;

let nextTodoId = 0;
class TodoApp extends Component {
    render() {
        return (
            <div>
                <input 
                    ref={node => {
                        this.input = node;
                    }}
                />
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo => {return(
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    )})}
                </ul>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp 
            todos={store.getState().todos}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();