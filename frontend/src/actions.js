import { push } from 'redux-router';

var http = require('utils/http');

export function loginUserSuccess(user) {
//  localStorage.setItem('token', token);
  return {
    type: 'LOGIN_USER_SUCCESS',
    payload: user
  }
}


export function checkAuth() {
	return function(dispatch){
		http.get('/api/session')
			.then(data => {
				dispatch(loginUserSuccess(data));
				if (data.accountType == "client"){
					dispatch(loadAvailableProjects());
				}

				if (data.accountType == "supplier"){
					dispatch(loadMyProjects());
				}
			})
	}
}


export function logout() {
    localStorage.removeItem('token');
    return {
        type: 'LOGOUT_USER'
    }
}

export function login(email, pass) {
    return (dispatch) => http.post('/api/login', { email : email, password : pass })
    			.then(data => dispatch(loginUserSuccess(data)))
    			//TODO: fail
}



export function loadMyProjects(){
	return (dispatch) => {
		dispatch({ type: "LOAD_MY_PROJECTS"});
		return http.get('/api/projects').then(json => dispatch({ type: "LOAD_MY_PROJECTS_SUCCESS", payload: json }));
	}
}

export function deleteProject(project){
	return (dispatch) => {
		return http.del('/api/projects/' + project.id )
			.then(() => dispatch(loadMyProjects()))
	}
}

export function createProject(form){
	return (dispatch) => {
		return http.post('/api/projects', form).then(() => {
			dispatch(push('/'));
		})
	}
}

export function resetRegistrationStatus(){
	return { type: "RESET_REGISTRATION_STATUS" }
}

export function registerUser(data){
	return (dispatch) => http.post('/api/users', data).then(() => {
		dispatch({ type: "REGISTRATION_SUCCESS" });
	})
}

export function loadAvailableProjects() {
	return (dispatch) => {
		return http.get('/api/projects').then(json => dispatch({ type: "LOAD_AVAILABLE_PROJECTS_SUCCESS", payload: json }));
	}
}

export function showDasboard() {
	return (dispatch, getState) => {
		console.log(getState());

	}
}




