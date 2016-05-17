
const initState = {
	paymentType: 'cash',

	formLoading: true,
	cities: [],

	tourists: [
		{
			name: '',
			contactPerson: false,
			later: false
		},
		{
			name: '',
			contactPerson: false,
			later: false
		}
	]
}



export function reducer(state = initState, action){
	switch(action.type){
		case "START_LOADING_CITES":
			return {...state, formLoading: true };

		case "CITES_LOADED_SUCCESS":
			return {...state, formLoading: false, cities: action.payload };

		case "CHANGE_PAYMENT_TYPE":
			return {...state, ...action.form, paymentType: action.payload }

		case "CHANGE_TOURIST_NAME":
			var tourists = [...state.tourists];
			var { number, name, form } = action.payload;

			tourists[number].name = name;

			return {...state,...form, tourists }

		case "SET_CONTACT_PERSON":
			var tourists = state.tourists;
			var { form, number, form } = action.payload;

			var newTourist = [];
			for(var n = 0; n < state.tourists.length; n++){
				if (n == number) {
					newTourist.push({...state.tourists[n], contactPerson: true, name: form.firstName })
				} else {
					newTourist.push({...state.tourists[n], contactPerson: false, name: '' });
				}				
			}

			return {...state,...form, tourists: newTourist };

		case "SET_LATER":
			var tourists = [...state.tourists];
			var { form, number, form } = action.payload;

			tourists[number].later = !tourists[number].later;

			return {...state,...form, tourists };

		default:
			return state;
	}
}