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


import { reducer as orderForm } from './orderForm'

import {reducer as form } from 'redux-form';


const normalizePhone = (value, previousValue) => {

  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return onlyNums + '-'
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3) + '-'
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3)
  }
  return onlyNums.slice(0, 3) + '-' + onlyNums.slice(3, 6) + '-' + onlyNums.slice(6, 10)
}


export default combineReducers({
	form: form.normalize({ 
		orderForm: { 
			phone: normalizePhone 
		} 
	}),
	orderForm: orderForm,
	auth,
	app,
	router: routerStateReducer
});