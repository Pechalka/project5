var React = require('react');
require('./index.css');
var {Grid, Col, Row} = require('react-bootstrap')
var Footer = React.createClass({

	render: function() {
		return <footer>
			<Grid>
				<Row>
					<Col xs={12}>
						footer information is here
					</Col>
				</Row>
			</Grid>
		</footer>
	}

});

module.exports = Footer;