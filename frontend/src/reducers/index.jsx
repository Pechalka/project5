import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';

const initState = {
	accountType: null, //client supplier
};

function auth(state = initState, action){
	switch(action.type){
		case "LOGIN_USER_SUCCESS":
			return { accountType: action.payload.accountType };

		case 'LOGOUT_USER':
			return { accountType: null }

		default:
			return state;
	}
}



const initAppState = {
	myProjects: [],
	availableProjects: [],
	isLoading: false,
	registrationStatus: null
};

function app(state = initAppState, action){
	switch(action.type){
		case "LOAD_MY_PROJECTS":
			return {...state, isLoading: true, myProjects: [] };

		case "LOAD_MY_PROJECTS_SUCCESS":
			return {...state, isLoading: false, myProjects: action.payload };

		case "REGISTRATION_SUCCESS":
			return {...state, registrationStatus: "success" };
		
		case "RESET_REGISTRATION_STATUS":
			return {...state, registrationStatus: null };

		case "LOAD_AVAILABLE_PROJECTS_SUCCESS":
			return {...state, availableProjects: action.payload };

		default:
			return state;
	}
}


export default combineReducers({
	auth,
	app,
	router: routerStateReducer
});