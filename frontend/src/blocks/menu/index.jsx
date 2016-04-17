var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, CollapsibleNav, OverlayTrigger, Popover, Input } = require('react-bootstrap');
var { Navigation } = require('react-router');

var { auth } = require('utils/auth');

var menu = React.createClass({
	mixins : [Navigation],
	logOut : function(){
		auth.logout(()=>{
			this.props.onLogout();
		});
	},
	login : function(e){
		e.preventDefault();
		var form = e.target;
		var params = {
			email : form.querySelector('[name=email]').value,
			password : form.querySelector('[name=password]').value,			
		}
		this.props.onLogin(params);
	},
	render: function() {
		if (this.props.user){
			
			return <Navbar brand={<a href="#/">menu</a>}  inverse toggleNavKey={0}>
				<CollapsibleNav>
		    	<Nav navbar left eventKey={0}> 
		    		
		    		<NavItem eventKey={3} href={this.makeHref('add-project')}>start project</NavItem>
				</Nav>
		    	<Nav navbar right>
		    		
			    		<NavItem onClick={this.logOut} eventKey={4} >log out</NavItem>
		    		
		    	</Nav>
		    	</CollapsibleNav>
		  	</Navbar>			
		} else {
			var loginOverlay = (
				<Popover>
					<form onSubmit={this.login}>
						<Input name="email" placeholder="email" type="email"/>
						<Input name="password" placeholder="password" type="password"/>
						<Button type="submit" block bsStyle="primary">login</Button>
					</form>
				</Popover>
			);
			return <Navbar brand={<a href="#/">menu</a>}  inverse toggleNavKey={0}>
				<CollapsibleNav>
		    	<Nav navbar left eventKey={0}> 		    		
		    		<NavItem eventKey={3} href={this.makeHref('registr')}>registr</NavItem>
		    		<NavItem eventKey={3} href={this.makeHref('about')}>about projet</NavItem>
				</Nav>
				<Nav navbar right>
					<OverlayTrigger trigger="click" placement="bottom" overlay={loginOverlay}>
		    			<NavItem  eventKey={4} >log in</NavItem>
		    		</OverlayTrigger>
		    	</Nav>
		    	</CollapsibleNav>
		  	</Navbar>
		}

	}

});

module.exports = menu;