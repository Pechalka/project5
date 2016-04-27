var React = require('react');
var {Grid, Row, Col, Panel, Input, Button} = require('react-bootstrap');
var http = require('utils/http')
var companyProfile = React.createClass({
	mixins : [React.addons.LinkedStateMixin],
	getInitialState: function() {
		return {
			email: '',
			password: '',
			name: '',
			description: '',
			editMode: false,
			technologies: '',

		};
	},
	editCompanyInfo: function(e){
		this.setState({
			editMode : true 
		});
	},
	componentWillReceiveProps: function(nextProps) {
	
		this.setState({
			...nextProps.user 
		});
	},
	updateUser: function(e){
		var user = this.props.user;
		if(!user){
			return
		} else {
			var id = user.id
		}
		var data = {
			...this.state
		};
		http.put('/api/users/' + id , data)
			.then(() => this.setState({ editMode : false }))
	},
	render: function(){
	var user = this.state;
	var content;
	var title;
	var editMode;
	var editModeTitle;


	if(!user){
		title = (<div>no title </div>)
	} else {
		if(user.name == null ){
			title = (<div><h3>Enter your company title</h3><a onClick={this.editCompanyInfo}>Edit info</a></div>)
		} else {
			title = (<h3>{user.name}</h3>)
		}
		
	}

	if(!user){
		editModeTitle = (<div>no title </div>)
	} else {
		editModeTitle = (<div>Company title <Input type='text' placeholder='Change your title'/></div>)
	}

	if(!user){
		content = (<div> no user </div>)
	} else {
		content = (<div>

			    <Panel header={title}>
			      <div>Your email : {user.email}</div>
			      <div>Your password : {user.password}</div>
			      <div>Description : {user.description} </div>
			      <div>Main technologies : {user.technologies} </div>
			    </Panel>
			</div>)
	};

	if(!user) {
		editMode = (<div> no user </div>)
	} else {
		editMode = (<div>
			<Panel header={editModeTitle}>
			      <div>Your email : <Input valueLink={this.linkState('email')} type='text' placeholder='Change your email'/></div>
			      <div>Your password : <Input valueLink={this.linkState('password')} type='text' placeholder='Change your password'/></div>
			      <div>Repeate password : <Input type='text' placeholder=''/></div>
			      <div>Description : <Input valueLink={this.linkState('description')} placeholder='Edit company info here'/> </div>
			      <div>Main technologies : <Input valueLink={this.linkState('technologies')} type='text' placeholder='Add main technologies you are interested in'/> </div>
			      <Button onClick={this.updateUser} bsStyle='success'> Renew info </Button>
			</Panel>

		 </div>)
	};

	return <Grid> 
			<Row>
				<Col xs={12}>
					{!this.state.editMode && {content}} 
					{this.state.editMode && <div> {editMode}</div>}
				</Col>
			</Row>
		</Grid>
	}

});

module.exports = companyProfile;