
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
			.then(data => dispatch(loginUserSuccess(data)))
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

