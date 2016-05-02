import React from 'react'
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute } from 'react-router'

var About = require('pages/about/');
var App = require('pages/app/');
var Registr = require('pages/registr/');
var AddProject = require('pages/addProject/');
var Dashboard = require('pages/dashboard/index.jsx');
var NoMatch = require('pages/404/');



var routes = ((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route component={Dashboard} name="dashboard" />
	  <Route name="add-project" component={AddProject} path="add-project" />      
      <Route path="about" component={About}/>
      <Route path="registr" component={Registr}/>      
      <Route path="history" component={require('pages/history/')}/>  
      <Route path="companyProfile" component={require('pages/companyProfile/')} />    
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
));

module.exports = routes;