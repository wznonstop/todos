import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

class MainSection extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = { filter: SHOW_ALL }
    }

    handleClearCompleted() {
        this.props.actions.clearCompleted();
    }

    handleShow(filter) {
        this.setState({filter})
    }

    renderFooter(completedCount, activeCount) {
        const { filter } = this.state
        return(
            <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
        )
    }

    render() {
        const { todos, actions } = this.props
        const { filter } = this.state
        const completedTodo = todos.filter(TODO_FILTERS[SHOW_COMPLETED]);
        const completedCount = completedTodo.length;
        const activeTodos = todos.filter(TODO_FILTERS[SHOW_ACTIVE]);
        const activeCount = activeTodos.length;

        const filteredTodos = todos.filter(TODO_FILTERS[filter]);

        return(
            <section className="main">
                <ul className="todo-list">
                  {filteredTodos.map(todo =>
                    <TodoItem key={todo.id} todo={todo} {...actions} />
                  )}
                </ul>
                {this.renderFooter(completedCount, activeCount)}
            </section>
        )
    }
}

export default MainSection
