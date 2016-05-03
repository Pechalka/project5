var React = require('react');
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
var { RouteHandler } = require('react-router');

import { logout, login } from '../../actions';

var { Grid, Button , Label, ListGroup, ListGroupItem, Input, Navbar, Nav, NavItem } = require('react-bootstrap');

var { Authentication } = require('utils/auth');

var { auth } = require('utils/auth');

var Menu = require('blocks/menu/index.jsx');

var Footer = require('blocks/footer/index.jsx')

var http = require('utils/http');

require('./index.css');

var App = React.createClass({
	logout : function(){
		this.props.logout();
	},
	
	login : function(form){
		this.props.login(form.email, form.password)
	},

	render: function() {
		return <div>
			<Menu  accountType={this.props.accountType} onLogout={this.logout} onLogin={this.login}/>
			
			{this.props.children}

			<Footer/>
		</div>
	}

});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout, login }, dispatch)
}

module.exports = connect(
	(state) => { return { accountType: state.auth.accountType }; }, 
	mapDispatchToProps
)(App);