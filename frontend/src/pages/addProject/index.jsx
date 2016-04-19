var React = require('react');

var Menu = require('blocks/menu/index.jsx');
var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, CollapsibleNav, Input } = require('react-bootstrap');
var { Navigation } = require('react-router');

var http = require('utils/http');

var languages = require('json!./languages.json')

var AddProjectForm = React.createClass({
	mixins : [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			title : '',
			description : '' ,
			language : 'en',
			budget : 0,
			projectDuration: 1
		};
	},
	submit : function(e){
		e.preventDefault();
		this.props.onCreate({...this.state});
	},
	render : function(){
		var options = languages.map(l => (
			<option value={l.code} key={l.code} >{l.name}</option>			    
		));

		return <div>
			<form onSubmit={this.submit}>
				<Input valueLink={this.linkState('title')} label="title" type="text" />
				<Input valueLink={this.linkState('budget')} label="budget" type="text" />
				<Input valueLink={this.linkState('language')} type="select" label="language" placeholder="language">
			      {options}
			    </Input>
			    <Input valueLink={this.linkState('projectDuration')} label="project duration" type="text" />
				<Input valueLink={this.linkState('description')} label="description" type="textarea" />
				<Button type="submit">start project</Button>
			</form>
		</div>
	}
})

var AddProject = React.createClass({
	mixins : [Navigation],

	createProject : function(form){
		debugger
		http.post('/api/projects', form)
			.then(() => {
				this.transitionTo('/');
			})
	},


	render: function() {
		return <div>
			<Grid >
				<Row>
					<Col xs={4}>
						<AddProjectForm onCreate={this.createProject}/>
					</Col>
				</Row>
			</Grid>	

		</div>
	}

});

module.exports = AddProject;