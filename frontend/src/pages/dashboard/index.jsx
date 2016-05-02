var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, DropdownButton, MenuItem,  ButtonToolbar, Badge} = require('react-bootstrap');


var { Navigation, Link } = require('react-router');

var MyProject = React.createClass({
	 mixins : [Navigation],
	select : function(project, eventKey){
		if(eventKey == '1'){
			this.props.onDelete(project)
		}
	},
	renderProject : function(project){
		
		const href = this.makeHref('project-details', { id : project.id });
		const title = (<div className="clearfix"><h3 className="pull-left">{project.title}</h3>
			<div className='pull-right'>
				<ButtonToolbar>
					{!!project.selected && <Button bsStyle='primary'> Messages 
						<Badge bsStyle='primary'>{project.selected}</Badge>
					</Button>}
					 <DropdownButton onSelect={this.select.bind(null, project)} title="Actions" id="bg-nested-dropdown">
					      <MenuItem  eventKey="1">Delete</MenuItem>
					      <MenuItem eventKey="2">Edit</MenuItem>
			   		</DropdownButton>
			   	</ButtonToolbar>	
		   	</div>	
   		 </div>);
		return (
			<Panel header={title}>
			
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
			<h2>My projects:</h2>
			<div>
				{projects}
			</div>
		</div>
	}
	
});


var ProjectsList = React.createClass({
	mixins : [Navigation],
	select : function(project){
		project.selected += 1;
		http.put("api/projects/" + project.id, project);
	},
	renderProject : function(project){
		
		const href = this.makeHref('project-details', { id : project.id });
		const title = (<div className="clearfix"><h3 className="pull-left">{project.title}</h3><Button onClick={this.select.bind(null, project)} className='pull-right' bsStyle="success"> apply now </Button></div>);
		return (
			<Panel header={title}>
			
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
	loadProjects: function(){
		return http.get('/api/projects')
			.then((json) => this.setState({ projects : json }))
	},
	componentDidMount: function() {
		this.loadProjects()
	},
	onDelete : function(project){
		http.del('/api/projects/' + project.id )
			.then(this.loadProjects)
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
			var accountType = user.accountType;
			if(accountType == 'client') {
	    		content = <MyProject projects={this.state.projects} onDelete={this.onDelete} />;
	    	} else {
	    		content = <ProjectsList projects={this.state.projects} />;
 
	    	}	
		}

		return (
	    	<Grid >
				<Row>
					<Col xs={8}>
						{content}
					</Col>
					<Col xs={4}>
						<Panel header={<h3>Activity</h3>}>
							<div>Settings</div>
							<div>Item placed </div>
							<div>Item placed </div>
							<div>Item placed </div>
							<div> <Link to={'history'}>More info</Link> </div>
						</Panel>
					</Col>
				</Row>
			</Grid>	
		);
	}

});

module.exports = index;