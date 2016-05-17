var React = require('react');


var OrderForm = require('containers/OrderForm');
var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem } = require('react-bootstrap');


var TestForm = React.createClass({

	render: function() {
		return (
			<Grid>
				<Row>
					<Col xs={12}>
						<OrderForm />
					</Col>
				</Row>
			</Grid>
		);
	}

});



module.exports = TestForm;