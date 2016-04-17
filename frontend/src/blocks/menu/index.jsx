var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, CollapsibleNav } = require('react-bootstrap');
var { Navigation } = require('react-router');


var { auth } = require('utils/auth');

var menu = React.createClass({
	mixins : [Navigation],
	logOut : function(){
		auth.logout(()=>{
			this.props.onLogout();
		});
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
			return <Navbar brand={<a href="#/">menu</a>}  inverse toggleNavKey={0}>
				<CollapsibleNav>
		    	<Nav navbar left eventKey={0}> 		    		
		    		<NavItem eventKey={3} href={this.makeHref('loginAsSupplire')}>login as supplire</NavItem>
		    		<NavItem eventKey={3} href={this.makeHref('login')}>login as provider</NavItem>
		    		<NavItem eventKey={3} href={this.makeHref('about')}>about projet</NavItem>
				</Nav>
		    	</CollapsibleNav>
		  	</Navbar>
		}

	}

});

module.exports = menu;