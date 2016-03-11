/* [TODO APP] */
var TodoApp = React.createClass({
	getInitialState: function() {
		var todoList = [{
			name: 'walk through',
			complete: false,
			editing: false
		}, {
			name: 'lay down',
			complete: false,
			editing: false
		}];

		var unfinishedTodos = this.getUnfinishedTodos(todoList);

		var count = unfinishedTodos.length;
		return {
			todoList: todoList,
			completeAll: false,
			todoMode: 'all',
			todoCount: count
		};
	},

	checkCompleteAll: function(todoList) {
		if (todoList.length < 1) {
			return false;
		};
		return todoList.every(function(item) {
			return item.complete === true;
		})
	},

	handleAddTodo: function(event) {
		event.preventDefault();
		var newTodoName = React.findDOMNode(this.refs.inputTodo).value.trim();
		if (newTodoName) {
			var todoList = this.state.todoList.concat([{
				name: newTodoName,
				complete: false,
				editing: false
			}]);

			var unfinishedTodos = this.getUnfinishedTodos(todoList);
			var count = unfinishedTodos.length;

			this.setState({
				todoList: todoList,
				completeAll: this.checkCompleteAll(todoList),
				todoCount: count
			})
		};
		React.findDOMNode(this.refs.inputTodo).value = "";
	},

	handleChangeCompleteAll: function(event) {
		var todoList = this.state.todoList.map(function(item) {
			item.complete = !this.state.completeAll;
			return item;
		}.bind(this));

		var unfinishedTodos = this.getUnfinishedTodos(todoList);
		var count = unfinishedTodos.length;

		this.setState({
			completeAll: !this.state.completeAll,
			todoList: todoList,
			todoCount: count
		})
	},

	handleRemoveTodo: function(index) {
		var todoList = this.state.todoList.filter(
			function(item, i) {
				return i !== index
			}
		);

		var unfinishedTodos = this.getUnfinishedTodos(todoList);
		var count = unfinishedTodos.length;
		this.setState({
			todoList: todoList,
			completeAll: this.checkCompleteAll(todoList),
			todoCount: count
		})
	},

	handleChangeComplete: function(index) {
		var todoList = this.state.todoList.map(function(item, i) {
			if (i === index) {
				item.complete = !item.complete
			};
			return item;
		});
		var unfinishedTodos = this.getUnfinishedTodos(todoList);
		var count = unfinishedTodos.length;
		this.setState({
			todoList: todoList,
			completeAll: this.checkCompleteAll(todoList),
			todoCount: count
		})
	},

	handleUpdateTodo: function(i, val) {
		var todoList = this.state.todoList.map(function(item, index) {
			if (index === i) {
				if (item.name === val) {
					return;
				};
				item.name = val;
			};
			return item;
		});
		this.setState({
			todoList: todoList
		})
	},

	handleShowEdit: function(index) {
		var todoList = this.state.todoList.map(function(item, i) {
			if (i === index) {
				item.editing = true
			};
			return item;
		});
		this.setState({
			todoList: todoList
		})
	},

	handleEdit: function(index) {
		var todoList = this.state.todoList.map(function(item, i) {
			if (i === index) {
				item.editing = false
			};
			return item;
		});
		this.setState({
			todoList: todoList
		})
	},

	handleChangeMode: function(event) {
		this.setState({
			todoMode: event.target.value
		})
	},

	getUnfinishedTodos: function(list) {
		var todoNodes = list.filter(function(item) {
			return item.complete === false;
		})
		return todoNodes;
	},

	handleClearCompleted: function(event) {
		event.preventDefault();
		var todoList = this.getUnfinishedTodos(this.state.todoList);
		this.setState({
			todoList: todoList,
			completeAll: this.checkCompleteAll(todoList)
		});
	},

	checkCompleteSome: function(list) {
		if (list.length < 1) {
			return false;
		};
		return list.some(function(item) {
			return item.complete === true;
		})
	},

	render: function() {
		return (
			<div className="todoapp">
				<form onSubmit={this.handleAddTodo}>
				<input 
					type="checkbox"
					checked={this.state.completeAll}
					onChange={this.handleChangeCompleteAll}
					className={this.state.todoList.length > 0 ? 'toggle-all' : 'hide'}
					id="toggle-all"
				/>
				<input 
					type="text"
					ref="inputAddTodo"
					placeholder="What's new"
					ref="inputTodo"
					className="new-todo"
				/>
				</form>
				<TodoList 
					todoList={this.state.todoList}
					handleRemoveTodo={this.handleRemoveTodo}
					handleChangeComplete={this.handleChangeComplete}
					handleUpdateTodo={this.handleUpdateTodo}
					handleShowEdit={this.handleShowEdit}
					handleEdit={this.handleEdit}
					todoMode={this.state.todoMode}
				/>
				<div className={(this.state.todoList.length > 0) ? 'footer': 'hide'}>
					<label className="todo-count">
						{this.state.todoCount}
						{(this.state.todoList.length > 1) ? " items left" : " item left"}
					</label>

					<form className="filters">
						<input
							type="radio"
							value="all"
							name="mode"
							id="r1"
							defaultChecked={true}
							onChange={this.handleChangeMode}
							hidden
						 />
						 <label
						 	htmlFor="r1"
						 	className={this.state.todoMode === 'all' ? 'active' : null}
						 >All</label>
						 <input 
						 	type="radio"
						 	value="active"
						 	name="mode"
						 	id="r2"
						 	onChange={this.handleChangeMode}
						 	hidden
						 />
						 <label
						 	htmlFor="r2"
						 	className={this.state.todoMode === 'active' ? 'active' : null}
						 >Active</label>
						 <input 
						 	type="radio"
						 	value="complete"
						 	name="mode"
						 	id="r3"
						 	onChange={this.handleChangeMode}
						 	hidden
						 />
						 <label
						 	htmlFor="r3"
						 	className={this.state.todoMode === 'complete' ? 'active' :null}
						 >Complete</label>
					</form>
					<a
						href=""
						onClick={this.handleClearCompleted}
						className={this.checkCompleteSome(this.state.todoList) ? "clear-completed" : "visible-none"}
					>Clear completed</a>
				</div>
			</div>
		)
	}
});

var TodoList = React.createClass({
	render: function() {
		var todoNodes = this.props.todoList;
		if (this.props.todoMode === 'active') {
			todoNodes = todoNodes.filter(function(item) {
				return item.complete === false;
			})
		} else if (this.props.todoMode === 'complete') {
			todoNodes = todoNodes.filter(function(item) {
				return item.complete === true;
			})
		};
		todoNodes = todoNodes.map(function(item, index) {
			return (
				<TodoItem 
					todo={item}
					key={index}
					handleRemoveTodo={this.props.handleRemoveTodo.bind(null, index)}
					handleChangeComplete={this.props.handleChangeComplete.bind(null, index)}
					handleUpdateTodo={this.props.handleUpdateTodo.bind(null, index)}
					handleShowEdit={this.props.handleShowEdit.bind(null, index)}
					handleEdit={this.props.handleEdit.bind(null, index)}
				/>
			)
		}.bind(this));

		return (
			<div className="main">
				<ul className="todo-list">
					{todoNodes}
				</ul>
			</div>
		)
	}
});

var TodoItem = React.createClass({
	handleOnKeyDown: function(event) {
		if (event.which === 13) {
			this.handleSubmit(event)
		}
	},

	handleSubmit: function(event) {
		var val = React.findDOMNode(this.refs.inputEditTodo).value.trim();
		if (val) {
			this.props.handleUpdateTodo(val);
			this.props.handleEdit();
		} else {
			this.props.handleRemoveTodo();
		}
	},

	componentDidUpdate: function() {
		if (React.findDOMNode(this.refs.inputEditTodo)) {
			var el = React.findDOMNode(this.refs.inputEditTodo);
			el.value = el.value;
			el.focus();
		};
	},

	render: function() {
		var classString = this.props.todo.editing ? 'editing' : '';
		if (this.props.todo.complete) {
			classString += ' completed'
		}
		if (!this.props.todo.editing) {
			return (
				<li className={classString}>
				<div className="view">
					<input
						type="checkbox"
						checked={this.props.todo.complete}
						onChange={this.props.handleChangeComplete}
						className="toggle"
					 />
					 <label
					 	onDoubleClick={this.props.handleShowEdit}
					 	className="view"
					 >
					 	{this.props.todo.name}
					 </label>
					 <button 
					 	type="button"
					 	onClick={this.props.handleRemoveTodo}
					 	className="destroy"
					 ></button>
				</div>
			</li>
			)
		} else {
			return (
				<li className={classString}>
				 <input 
				 	type="text"
						defaultValue = {
							this.props.todo.name
						}
				 	onKeyDown={this.handleOnKeyDown}
				 	onBlur={this.handleSubmit}
				 	ref="inputEditTodo"
				 	className="edit"
				 />
			</li>
			)
		}
		return (
			<li className={classString}>
				<div className="view">
					<input
						type="checkbox"
						checked={this.props.todo.complete}
						onChange={this.props.handleChangeComplete}
						className="toggle"
					 />
					 <label
					 	onDoubleClick={this.props.handleShowEdit}
					 	className="view"
					 >
					 	{this.props.todo.name}
					 </label>
					 <button 
					 	type="button"
					 	onClick={this.props.handleRemoveTodo}
					 	className="destroy"
					 ></button>
				</div>
				 <input 
				 	type="text"
						defaultValue = {
							this.props.todo.name
						}
				 	onKeyDown={this.handleOnKeyDown}
				 	onBlur={this.handleSubmit}
				 	ref="inputEditTodo"
				 	className="edit"
				 />
			</li>
		)
	}
})


React.render(
	<TodoApp />,
	document.getElementById('container')
)