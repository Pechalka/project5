var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, CollapsibleNav, OverlayTrigger, Popover, Input, NavDropdown, MenuItem } = require('react-bootstrap');
var {  Link } = require('react-router');

var { auth } = require('utils/auth');


var ClientMenu = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
  	
  	makeHref: function(name){
  		return this.context.router.createHref(name);
  	},

	render: function(){
		return (
			<Navbar inverse>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">AppsDD</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
			        <NavItem eventKey={1} href={this.makeHref('companyProfile')}><Button bsStyle="success">Edit company profile</Button></NavItem>
			      </Nav>
			      <Nav pullRight>
			         <NavItem eventKey={2} onClick={this.props.logOut} >Logout</NavItem>
			      </Nav>
			    </Navbar.Collapse>
			</Navbar>
		);
	}
})

var ProviderMenu = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
  	
  	makeHref: function(name){
  		return this.context.router.createHref(name);
  	},

	render: function(){
		return (
			<Navbar inverse>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">AppsDD</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
			        <NavItem eventKey={1} href={this.makeHref('add-project')}><Button bsStyle="success">Start project now</Button></NavItem>
			      </Nav>
			      <Nav pullRight>
			        <NavItem eventKey={2} onClick={this.props.logOut} >Logout</NavItem>
			      </Nav>
			    </Navbar.Collapse>
			</Navbar>
		);
	}
})



var NotAuthUserMenu = React.createClass({
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
  	
  	makeHref: function(name){
  		return this.context.router.createHref(name);
  	},

	login : function(e){
		 e.stopPropagation()
		e.preventDefault();
		var form = document.querySelector('#js-login-form');// e.target;
		var params = {
			email : form.querySelector('input[name=email]').value,
			password : form.querySelector('input[name=password]').value,			
		}

		this.props.onLogin(params);
	},

	render: function(){
		var loginOverlay = (
			<Popover id="login">
				<form id="js-login-form" onSubmit={this.login}>
					<Input name="email" placeholder="email" type="email"/>
					<Input name="password" placeholder="password" type="password"/>
					<Button type="submit" block bsStyle="primary">login</Button>
				</form>
			</Popover>
		);

		return (
			<Navbar inverse>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">AppsDD</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
			        <NavItem eventKey={1} href={this.makeHref('registr')}>Registration</NavItem>
			        <NavItem eventKey={2} href={this.makeHref('about')}>About us</NavItem>
			      </Nav>
			      <Nav pullRight>
			      	<OverlayTrigger rootClose={true} trigger="click" placement="bottom" overlay={loginOverlay}>
				        <NavItem eventKey={2} href="#">Login</NavItem>
			        </OverlayTrigger>
			      </Nav>
			    </Navbar.Collapse>
			</Navbar>
		);
	}
})


var Menu = React.createClass({
	logOut : function(){
		auth.logout(()=>{
			this.props.onLogout();
		});
	},


	render: function() {
		const { accountType } = this.props;

		var menu = <NotAuthUserMenu onLogin={this.props.onLogin}/>;

		if (accountType == 'client'){
			menu = <ClientMenu logOut={this.logOut}/>;
		}

		if (accountType == 'supplier') {
			menu = <ProviderMenu logOut={this.logOut}/>;
		}


		return (
			<div>
				{menu}
			</div>
		);
	}

});


module.exports = Menu;