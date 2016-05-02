var React = require('react');

var Menu = require('blocks/menu/index.jsx');
var { Panel, Button, Grid, Row, Col, Navbar, Nav, NavItem, CollapsibleNav, Input } = require('react-bootstrap');
var { Navigation } = require('react-router');

var http = require('utils/http');


var languages = require('json!./languages.json');

var currency = [
	{ cur : '$US'},
	{ cur : '€EUR'},
	{ cur : '£GBP'}
];
var duration = [
	{ duration : 'days'},
	{ duration : 'month'},
];

var AddProjectForm = React.createClass({
	mixins : [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			title : '',
			description : '' ,
			language : 'en',
			budget : null,
			currency: '$US',
			duration: 'month',
			projectDuration: null
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
	
		var currencies = currency.map(cur => (
			<option value={cur.cur} key={cur.cur}>{cur.cur}</option> 
		));
		var durations  = duration.map(d  => (
			<option value={d.duration} key={d.duration }>{d.duration}</option> 
		));
		return <div>
			<form onSubmit={this.submit}>
				<Input placeholder="Project title" valueLink={this.linkState('title')} label="Title" type="text" />
				<Input placeholder="1000" valueLink={this.linkState('budget')} label="Budget" type="text" />
				<select valueLink={this.linkState('currency')}>
   					{currencies}
  				</select>

				<Input valueLink={this.linkState('language')} type="select" label="Language" placeholder="language">
			      {options}
			    </Input>
			    <Input placeholder="6" valueLink={this.linkState('projectDuration')} label="Project duration" type="text" />
			    <select valueLink={this.linkState('duration')}>
   					{durations}
  				</select>
				<Input placeholder="Enter your description here..." valueLink={this.linkState('description')} label="Description" type="textarea" />
				<Button type="submit">start project</Button>
			</form>
		</div>
	}
})

var AddProject = React.createClass({
	mixins : [Navigation],

	createProject : function(form){

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