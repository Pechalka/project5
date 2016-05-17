
const cities = [
	{
		name: 'Minsk',
		id: 1
	},
	{
		name: 'Moscow',
		id: 2
	},
	{
		name: 'Brest',
		id: 3
	}
]

export function loadCities(){
	return dispatch => {
		dispatch({ type: 'START_LOADING_CITES'});

		setTimeout(function(){
			dispatch({ type: 'CITES_LOADED_SUCCESS', payload: cities });

		}, 200)
	}	
}

import {getValues} from 'redux-form';


export function changePaymentType(paymentType){
	return (dispatch, getState) => {
		const fullState = getState();
		const form = getValues(fullState.form.orderForm);

		dispatch({
			type: 'CHANGE_PAYMENT_TYPE',
			payload: paymentType,
			form
		})
	}
}

export function changeTouristName(newName, number){
	return (dispatch, getState) => {
		const form = getValues(getState().form.orderForm);
		dispatch({
			type: 'CHANGE_TOURIST_NAME',
			payload: {
				name: newName,
				number,
				form
			}
		})
	}
}

export function setContactPerson(contactPerson, number) {
	return (dispatch, getState) => {

		//if (!contactPerson) {
			const form = getValues(getState().form.orderForm);

			dispatch({
				type: 'SET_CONTACT_PERSON',
				payload: {
					form,
					number 
				}
			})
	//	}
	}
}

export function setLater(later, number) {
	return (dispatch, getState) => {
		const form = getValues(getState().form.orderForm);

		dispatch({
			type: 'SET_LATER',
			payload: {
				form,
				number 
			}
		})
	}
}

