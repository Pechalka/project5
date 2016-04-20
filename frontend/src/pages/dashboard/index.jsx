var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem } = require('react-bootstrap');


var { Navigation } = require('react-router');




var ProjectsList = React.createClass({
	mixins : [Navigation],
	renderProject : function(project){
		
		const href = this.makeHref('project-details', { id : project.id });
		return (
			<Panel header={<h3>{project.title}</h3>}>
				<p>
					{project.description}
				</p>
				<div>
					<div className="pull-right">
						<Button href={href}>View more</Button>
					</div>
				</div>
			</Panel>
		);
	},
	render : function(){
		var projects = this.props.projects.map(this.renderProject);
		return <div>
			<h2>Projects available:</h2>
			<div>
				{projects}
			</div>
		</div>
	}
})


var http = require('utils/http');

var index = React.createClass({
	mixins : [Navigation],
	getInitialState: function() {
		return {
			projects : [] 
		};
	},
	componentDidMount: function() {
		http.get('/api/projects')
			.then((json) => this.setState({ projects : json }))
	},
	renderItem : function(p){
		var href = '#/';
		//this.makeHref('tasks', { projectId : p.id })
		return <li>
			<Button bsStyle="link" href={href}>{p.title}</Button>
		</li>
	},
	render: function() {
		var user = this.props.user;

		let content = (
			<div>
				<h1>Hello !</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora neque sapiente ullam fugit, officia possimus asperiores labore voluptate veniam reprehenderit, modi excepturi accusantium obcaecati atque ea. Ullam assumenda minus non.</p>	
			</div>			
		);

		if (user) {
	    	content = <ProjectsList projects={this.state.projects} />;	
		}

		return (
	    	<Grid >
				<Row>
					<Col xs={8}>
						{content}
					</Col>
					<Col xs={4}>
						<Panel header={<h3>links</h3>}>
							<div>Settings</div>
							<div>Item placed </div>
							<div>Item placed </div>
							<div>Item placed </div>
							<div> <a href="#">View more</a> </div>
						</Panel>
					</Col>
				</Row>
			</Grid>	
		);
	}

});

module.exports = index;