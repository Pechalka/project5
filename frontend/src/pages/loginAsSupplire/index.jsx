var React = require('react');

var { Grid, Row, Col, Button , Label, TabbedArea, TabPane, ListGroup, ListGroupItem, Input } = require('react-bootstrap');
var { Navigation } = require('react-router');
var http = require('utils/http');

var { auth } = require('utils/auth');


var LoginForm = React.createClass({
	mixins : [Navigation, React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			email : 'test@test.com',
			password : 'qwer1234' 
		};
	},
	login : function(){
		auth.login(this.state.email, this.state.password, (login)=>{
			if (login) this.transitionTo('/');
		})
	},
	render : function(){
		return <form className="login-form">
			<Input valueLink={this.linkState('email')} type="text" label="email" />
			<Input valueLink={this.linkState('password')} type="password" label="password" />
			<Button onClick={this.login} bsStyle="primary">login</Button>
		</form>
	}
})

var loginAsSupplire = React.createClass({

	render: function() {
		return 	<Grid >
			<Row>
				<Col xs={12}>
					<LoginForm/>
				</Col>
			</Row>
		</Grid>
	}

});

module.exports = loginAsSupplire;