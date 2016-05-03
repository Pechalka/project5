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


export default combineReducers({
 auth,
 router: routerStateReducer
});