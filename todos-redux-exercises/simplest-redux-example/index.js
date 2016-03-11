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

const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>;
    };
    return (
        <a href='#'
            onClick={e => {
                e.preventDefault;
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                });
            }}
        >
            {children}
        </a>
    )
};

const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => !t.completed
            );
    }
}

let nextTodoId = 0;
class TodoApp extends Component {
    render() {
        const {
            todos,
            visibilityFilter
        } = this.props;
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );
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
                    {visibleTodos.map(todo => {return(
                        <li key={todo.id}
                            onClick={() => {
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                });
                            }}
                            style={{
                                textDecoration: 
                                todo.completed ?
                                'line-through' :
                                'none' 
                            }}
                        >
                            {todo.text}
                        </li>
                    )})}
                </ul>
                <p>
                    Show:
                    {' '}
                    <FilterLink 
                        filter='SHOW_ALL'
                        currentFilter={visibilityFilter}
                    >
                        ALL
                    </FilterLink>
                    {' '}
                    <FilterLink 
                        filter='SHOW_ACTIVE'
                        currentFilter={visibilityFilter}
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink 
                        filter='SHOW_COMPLETED'
                        currentFilter={visibilityFilter}
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>
        )
    }
}
//上面那个{' '}只是为了用来制造空格的，并没有别的用途，children则就是标签之间的内容



const render = () => {
    ReactDOM.render(
        <TodoApp 
            {...store.getState()}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();