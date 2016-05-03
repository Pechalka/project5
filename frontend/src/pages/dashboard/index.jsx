var React = require('react');

var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, DropdownButton, MenuItem,  ButtonToolbar, Badge} = require('react-bootstrap');


var { Navigation, Link } = require('react-router');

var MyProject = React.createClass({
	select : function(project, eventKey){
		if(eventKey == '1'){
			this.props.onDelete(project)
		}
	},
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
  	
  	makeHref: function(name){
  		return this.context.router.createHref(name);
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


var AvailableProjects = React.createClass({
	select : function(project){
		project.selected += 1;
		http.put("api/projects/" + project.id, project);
	},
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
  	
  	makeHref: function(name){
  		return this.context.router.createHref(name);
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
	contextTypes: {
    	router: React.PropTypes.object.isRequired
  	},
  	
  	makeHref: function(name){
  		return this.context.router.createHref(name);
  	},

	componentDidMount: function() {
		if (this.props.accountType == "client")
			this.props.loadAvailableProjects();

		if (this.props.accountType == "supplier")
			this.props.loadMyProjects();
		
	//	alert(this.props.accountType);

		//this.props.showDasboard()
	},

	// componentWillReceiveProps: function(nextProps) {
	// 	if ()
	// },

	renderItem : function(p){
		var href = this.makeHref('tasks', { projectId : p.id })
		return <li>
			<Button bsStyle="link" href={href}>{p.title}</Button>
		</li>
	},
	render: function() {
		const { accountType } = this.props;

		let content = (
			<div>
				<h1>Hello !</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora neque sapiente ullam fugit, officia possimus asperiores labore voluptate veniam reprehenderit, modi excepturi accusantium obcaecati atque ea. Ullam assumenda minus non.</p>	
			</div>			
		);


		if (accountType == 'client'){
			content = <AvailableProjects projects={this.props.availableProjects} />;
		}

		if (accountType == 'supplier'){
			content = <MyProject projects={this.props.myProjects} onDelete={this.props.deleteProject} />;
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

import {connect} from 'react-redux';

import { loadMyProjects, deleteProject, showDasboard, loadAvailableProjects } from '../../actions';

import { bindActionCreators  } from 'redux'

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadMyProjects, deleteProject, showDasboard, loadAvailableProjects }, dispatch)
}

module.exports = connect(function(state){
	return {
		accountType: state.auth.accountType,
		myProjects: state.app.myProjects,
		availableProjects: state.app.availableProjects
	}
},
mapDispatchToProps
)(index);

