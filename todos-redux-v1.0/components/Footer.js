import React, { PropTypes, Component } from 'react'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

class Footer extends Component {
    renderTodoCount(){
        const { activeCount } = this.props
        const itemWord = activeCount === 1 ? 'item' : 'items'
        return (
            <span className="todo-count">
              <strong>{activeCount}</strong> {itemWord} left
            </span>
        )
    }

    renderFilterLink(filter){
        const title = FILTER_TITLES[filter]
        const { onShow } = this.props
        const currentFilter = this.props.filter
        return (
          <a className={(filter === currentFilter) ? 'selected' : ''}
             style={{ cursor: 'pointer' }}
             onClick={() => onShow(filter)}>
            {title}
          </a>
        )
    }

    renderClearButton() {
        const {completedCount} = this.props
        const {onClearCompleted} = this.props
        if (completedCount > 0) {
            return (
                <button className={"clear-completed"} onClick={onClearCompleted}>
                    Clear completed
                </button>
            )
        }; 
    }

    render() {
        return(
            <footer className="footer">
                {this.renderTodoCount()}
                <ul className="filters">
                  {[ SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED ].map(filter =>
                    <li key={filter}>
                      {this.renderFilterLink(filter)}
                    </li>
                  )}
                </ul>
                {this.renderClearButton()}
            </footer>
        )
    }
}

export default Footer