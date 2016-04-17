var React = require('react');

var cx = require('classnames');

var _ = require('lodash');

import {observer,  } from 'mobx-react';
import {observable, transaction} from 'mobx';


import './index.css'

var todoStore = observable({
	todos : [],
	filter : 'all',

	filterItems : function(){
		if (this.filter == 'completed') return this.todos.filter(t => t.completed);

		return this.todos;
	}
})

todoStore.addTodo = function(title){
	setTimeout(function(){
		transaction(() => {
		//	todoStore.filter = 'all'
			todoStore.todos.push({
				title : title,
				id : new Date().getTime(),
				completed : false
			})
		})
				
	}, 200)

}

todoStore.removeTodo = function(todo){
	todoStore.todos = todoStore.todos.filter(t => t.id != todo.id )
}

todoStore.toggleTodo = function(todo){
	todo.completed = !todo.completed;
}

todoStore.changeFilter = function(newFilter){
	todoStore.filter = newFilter
}

//var PureRenderMixin = require('react-addons-pure-render-mixin');

var Filter = React.createClass({
	
	componentWillReceiveProps: function(nextProps) {
		console.log(this.props == nextProps, this.props, nextProps);
	},
	render : function(){
		var { changeFilter, filter } = this.props;

		return <div>
			<a onClick={() => changeFilter('all')} className={cx({ 'active' : filter == 'all'})} href="javascript:void(0)">all</a>
			<a onClick={() => changeFilter('completed')} className={cx({ 'active' : filter == 'completed'})} href="javascript:void(0)">complted</a>
		</div>
	}
})


var Panel = observer(React.createClass({
	addTodo : function() {
		const input = React.findDOMNode(this.refs.input);
		const title = input.value;
		this.props.model.addTodo(title);
		input.value = '';
	},
	
	componentWillReceiveProps: function(nextProps)  {
	    console.log(this.props.model == nextProps.model)
	},


	render : function(){
		console.log(' render ');

		const { todos, filter, addTodo, removeTodo, toggleTodo, changeFilter, filterItems } = this.props.model;

		return <div>
			<Filter filter={this.props.model.filter} changeFilter={this.props.model.changeFilter} />

			<div>
				{ filterItems.map(todo => (
					<div style={{cursor : 'pointer', textDecoration : todo.completed ? 'line-through' : null }}>
						<span onClick={() => toggleTodo(todo)}>{todo.title}</span>
						<button onClick={() => removeTodo(todo)}>remove</button>
					</div>
				))}
			</div>
			<div>
				<input ref="input" type="text" />
				<button onClick={this.addTodo}>add</button>
			</div>
		</div>
	}
}))


var Test = React.createClass({

	render: function() {
		return <div>			
			<Panel model={todoStore}/>
		</div>
	}

});


todoStore.addTodo("1111");
todoStore.addTodo("2222");
todoStore.addTodo("3333");


module.exports = Test;