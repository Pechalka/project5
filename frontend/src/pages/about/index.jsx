var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, CollapsibleNav } = require('react-bootstrap');


var index = React.createClass({

	render: function() {
		return <Grid >
			<Row>
				<Col xs={12}>
					<h1>about</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora neque sapiente ullam fugit, officia possimus asperiores labore voluptate veniam reprehenderit, modi excepturi accusantium obcaecati atque ea. Ullam assumenda minus non.</p>	
				</Col>
			</Row>
		</Grid>	
	}

});

module.exports = index;