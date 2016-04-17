var React = require('react');
var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem } = require('react-bootstrap');

var http = require('utils/http');


var ProjectDetails = React.createClass({
	getInitialState: function() {
		return {
			project: null
		};
	},
	componentDidMount: function() {
		http.get('/api/projects/' + this.props.params.id)
			.then(json => this.setState({ project : json }))
	},
	render: function() {
		const { project } = this.state;

		if (!project) return <div>loading...</div>

		return <div>
			<Grid>
				<Row>
					<Col xs={12}>
						<h2>{project.title}</h2>
						<p>description:{project.description}</p>
						<p>language:{project.language}</p>
						<p>budget:{project.budget}</p>
					</Col>
				</Row>
			</Grid>
		</div>
	}

});

module.exports = ProjectDetails;