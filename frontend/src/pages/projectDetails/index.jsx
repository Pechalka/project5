var React = require('react');
var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem } = require('react-bootstrap');
var {Link, Router} = require('react-router')
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
						<Link to='/'>Back to all projects</Link>
						<h2>{project.title}</h2>
						<p>description:{project.description}</p>
						<p>language:{project.language}</p>
						<p>budget:{project.budget} </p>
						<span>{project.currency}</span>
						<p>project duration:{project.projectDuration}</p>
						<span>{project.duration}</span>
					</Col>
					<Button bsStyle="success"> Apply now </Button>
				</Row>
			</Grid>
		</div>
	}

});

module.exports = ProjectDetails;