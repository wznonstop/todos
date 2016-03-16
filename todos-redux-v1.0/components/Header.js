import React, { PropTypes, Component } from 'react'

class Header extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleAddTodo(e){
        e.preventDefault();
        // const textVal = this.state.text.trim();
        const textVal = this.refs.inputArea.value.trim();
        if (textVal) {
            this.props.actions.addTodo(textVal);
            // this.setState({ text: '' })
            this.refs.inputArea.value = '';
        };
    }

    handleChangeCompleteAll(){
        this.props.actions.completeAll()
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={this.handleAddTodo.bind(this)}>
                <input 
                    type="checkbox"
                    checked={this.props.completeAll}
                    onChange={this.handleChangeCompleteAll.bind(this)}
                    className={this.props.todos.length > 0 ? 'toggle-all' : 'hidden'}
                    id="toggle-all"
                />
                <input 
                    ref="inputArea"
                    type="text"
                    placeholder="What's new"
                    className="new-todo"
                    autoFocus="true"
                />
                </form>
            </header>
        )
    }
}

export default Header