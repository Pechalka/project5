var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, Input, FormControls, Alert } = require('react-bootstrap');

var cx = require('classnames');

var http = require('utils/http');

var LinkedStateMixin = require('react-addons-linked-state-mixin');

require('./index.css');

var Registr = React.createClass({
	mixins : [LinkedStateMixin],
	getInitialState: function() {
		return {
			accountType : 'client' ,
			email : '',
			password : '',
			retype_password : '',
			isRegister : false
		};
	},
	changeType : function(type){
		this.setState({
			accountType : type
		})
	},
	createAccount : function(){
		const data = {
			email : this.state.email,
			password : this.state.password,
			accountType : this.state.accountType
		}
		http.post('/api/users', data)
			.then(() => this.setState({ isRegister : true }))
	},
	render: function() {
		var benefits;
		if (this.state.accountType == 'client'){
			benefits = (
				<Panel header={<h3>We are better, because:</h3>}>
					<ul>
						<li>Reason 1</li>
						<li>Reason 2</li>
						<li>Reason 3</li>
					</ul>
				</Panel>
			);
		} else {
			benefits = (
				<Panel header={<h3>What you get:</h3>}>
					<ul>
						<li>What you get 1</li>
						<li>What you get 2</li>
						<li>What you get 3</li>
						<li>What you get 4</li>
					</ul>
				</Panel>
			);
		}
		
		const buttonDisabled = this.state.password!='' && this.state.password != this.state.retype_password;

		let form = (
			<form>
				<div className="form-group">
					<label className="control-label">Our organization is</label>
					<div >
				    	<Input onChange={this.changeType.bind(null, "client")} type="radio" name="accountType" label="Client"  checked={this.state.accountType == 'client'} />
				    	<Input onChange={this.changeType.bind(null, "supplier")} type="radio" name="accountType" label="IT Supplier" checked={this.state.accountType == 'supplier'}  />					
					</div>
				</div>
				<Input valueLink={this.linkState('email')} type="email" label="Email" />
				<Input valueLink={this.linkState('password')} type="password" label="Password" />
				<Input valueLink={this.linkState('retype_password')} type="password" label="Retype password" />
				<Button onClick={this.createAccount} disabled={buttonDisabled}>Create Account</Button>
			</form>
		);

		if (this.state.isRegister){
			form = (<div>
				<Alert bsStyle="success">
				    Account create <strong>success</strong>.
				    <p>Now you can login as <strong>{this.state.email}</strong></p> 
				</Alert>
			</div>);
		}

		var css = cx('registration', {
			'registration--client' : this.state.accountType == 'client',
			'registration--supplier' : this.state.accountType == 'supplier',			
		})

		return <div className={css}>
			<Grid>
				<Row>
					<Col xs={4}>
						{form}
					</Col>
					<Col xsOffset={4} xs={4}>
						{benefits}
					</Col>
				</Row>
			</Grid>
		</div>
	}

});

module.exports = Registr;