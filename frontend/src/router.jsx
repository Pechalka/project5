var React = require('react');
var Router = require('react-router');

var { Route, Link, State, Redirect,
	Navigation, RouteHandler, 
	DefaultRoute } = Router;

var Layout = require('pages/layout/index.jsx');
var Dashboard = require('pages/dashboard/index.jsx');
var AddProject = require('pages/addProject/');
var CompanyProfile = require('pages/companyProfile/')
var App = require('pages/app/index.jsx');
var History = require('pages/history/')

//add-project
var routes = (
	<Route  path="/">
		<Route handler={App}>
			<DefaultRoute handler={Dashboard} name="dashboard" />
			<Route name="add-project" handler={AddProject} path="add-project" />
			<Route name="project-details" handler={require('pages/projectDetails/')} path="projects/:id" />
			<Route name="loginAsSupplire" handler={require('pages/loginAsSupplire/')} path="loginAsSupplire" />
			<Route name="about" handler={require('pages/about/')} path="about" />
			<Route name="registr" handler={require('pages/registr/')} path="registr" />
			<Route name="companyProfile" handler={require('pages/companyProfile/')} path="profile" />
			<Route name="history" handler={require('pages/history/')} path="history" />
		</Route>
		<Route name="test" handler={require('pages/test/')} path="test" />

		<Route name="login" handler={require('pages/login/index.jsx')} path="login" />
	
	</Route>);


module.exports = {
	run : function(){
		Router.run(routes, function (Handler) { 
			React.render(<Handler />, document.getElementById('app'));
		});
	}
}