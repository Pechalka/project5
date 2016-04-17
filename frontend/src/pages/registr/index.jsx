var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, Input, FormControls, Alert } = require('react-bootstrap');

var cx = require('classnames');

var http = require('utils/http');

require('./index.css');

var Registr = React.createClass({
	mixins : [React.addons.LinkedStateMixin],
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
				<Panel header={<h3>Плишки дял клиента</h3>}>
					<ul>
						<li>Плюшка 1</li>
						<li>Плюшка 2</li>
						<li>Плюшка 3</li>
					</ul>
				</Panel>
			);
		} else {
			benefits = (
				<Panel header={<h3>Плишки дял Supplier</h3>}>
					<ul>
						<li>Плюшка 1</li>
						<li>Плюшка 2</li>
						<li>Плюшка 3</li>
						<li>Плюшка 3</li>
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