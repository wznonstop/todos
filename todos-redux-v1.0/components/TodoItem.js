import React, { Component, PropTypes } from 'react'

class TodoItem extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = {
        editing: false
      }
    }

    handleBlur(e){
        const text = e.target.value.trim();
        this.handleSubmit(text);
    }

    handleKeyDown(e){
        const text = e.target.value.trim()
        if (e.which === 13) {
            this.handleSubmit(text);
        }
    }

    handleSubmit(text){
        if (text) {
            this.props.editTodo(this.props.todo.id, text)
        }else{
            this.props.deleteTodo(id);
        }
        this.setState({ editing: false })
    }

    handleDoubleClick(){
        this.setState({ editing: true });
    }

    render() {
        const { todo, completeTodo, deleteTodo } = this.props;
        let element;

        if (this.state.editing) {
            element = (
                <input className={"edit"}
                    type="text"
                    defaultValue={todo.text}
                    onBlur={this.handleBlur.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                 />
            )
        }else{
            element = (
                <div className="view">
                  <input className={"toggle"}
                         type="checkbox"
                         checked={todo.completed}
                         onChange={() => completeTodo(todo.id)} />
                  <label onDoubleClick={this.handleDoubleClick.bind(this)}>
                    {todo.text}
                  </label>
                  <button className="destroy"
                          onClick={() => deleteTodo(todo.id)} />
                </div>
            )
        }




        return(
            <li className={todo.completed ? 'completed' : '', this.state.editing ? 'editing' : ''}>
                {element}
            </li>
        )
    }
}

export default TodoItem
