
var React = require('react');

import {reduxForm} from 'redux-form';


import {connect} from 'react-redux';

require('./index.css');

import { loadCities, changePaymentType, changeTouristName, setContactPerson, setLater } from './actions';


var InputField = (props) => (
	<div className={`field ${(props.touched && props.invalid ? 'field--invalid' : '')}`}>
		<label className="field__label">
			{props.label}
		</label>
		<input className="field__input" type="text" {...props} />
		<span className="field__error-msg">{props.touched ? props.error : ''}</span>					
	</div>
)

var SelectField = (props) => {
	
	return (
		<div className={`field ${(props.touched && props.invalid ? 'field--invalid' : '')}`}>
			<label className="field__label">
				{props.label}
			</label>
			<select className="field__input" {...props}>
				{props.options.map(o => 
					<option key={o.value} value={o.value}>{o.title}</option>
				)}
			</select>
			<span className="field__error-msg">{props.touched ? props.error : ''}</span>					
		</div>
	)
}

var CheckboxField = (props) => (
	<div className={`field ${(props.touched && props.invalid ? 'field--invalid' : '')}`}>
		<label className="field__label">
			<input className="field__input" type="checkbox" {...props} />
			<span className="field__checbox-text">{props.label}</span>
		</label>		
		<span className="field__error-msg">{props.touched ? props.error : ''}</span>					
	</div>
)

var RadioField = (props) => (
	<div className={`field ${(props.touched && props.invalid ? 'field--invalid' : '')}`}>
		<label className="field__label">
			<input className="field__input" type="radio" {...props} />
			<span className="field__checbox-text">{props.label}</span>
		</label>		
		<span className="field__error-msg">{props.touched ? props.error : ''}</span>					
	</div>
)

const forms = {
	'cash': ['name', 'havepromocode', 'promocode', 'city', 'phone'],
	'card': ['firstName', 'lastName', 'patronymic', 'havepromocode', 'promocode', 'phone', 'tourists'],
}

var Tourists = React.createClass({
	rednerItem: function(t, n){
		var consts = {
			0: 'первый турист',
			1: 'Второй турист'
		};
		var { changeTouristName, setContactPerson, setLater } = this.props;

		return <div key={n}>
			<h3>{consts[n]}</h3>
			<CheckboxField  label="он же контактное лицо" checked={t.contactPerson} onChange={() => setContactPerson(t.contactPerson, n)} />
			<CheckboxField  label="заполнить потом" checked={t.later} onChange={() => setLater(t.later, n)} />

			{!t.later && <div>
				<InputField label="Name" value={t.name} onChange={(e) => changeTouristName(e.target.value, n)}/>
			</div>}

			<InputField label="File" />
		</div>
	},

	render: function(){
		var items = this.props.tourists.map(this.rednerItem);

		return <div>
			{items}
		</div>
	}
})

Tourists = connect(
	(state) => ({ tourists : state.orderForm.tourists }),
	{ changeTouristName, setContactPerson, setLater }
)(Tourists);

var OrderForm = React.createClass({
	componentWillMount: function() {
		this.props.loadCities();	
	},

	handleSumbit: function(props) {
		console.log(props);
	},

	renderField: function(field){
		const {fields: {
			name, promocode, havePromocode, city, paymentType, phone ,
			patronymic , firstName, lastName
		}, cities, handleSubmit, changePaymentType } = this.props;
		const citiesOptions = cities.map(c => ({ title: c.name, value: c.id }));

		switch(field){
			case "name":
				return <InputField key="name" label="Name" {...name} />;

			case "phone":
				return <InputField key="phone" placeholder="999-999-9999" label="Phone" {...phone} />;

			case "city":
				return <SelectField key="city" label="city" {...city} options={citiesOptions}/>;

			case "havepromocode":
				return <CheckboxField key="havepromocode" label="havepromocode" {...havePromocode} />;

			case "promocode":
				return <div key="promocode">{havePromocode.value && <InputField label="promocode" {...promocode} />}</div>

			case "firstName":
				return <InputField key="firstName" label="firstName" {...firstName} />;

			case "lastName":
				return <InputField key="lastName" label="lastName" {...lastName} />;

			case "patronymic":
				return <InputField key="patronymic" label="patronymic" {...patronymic} />;

			case "tourists":
				return <Tourists />

			default:
				return <div>render for {field} not found</div>
		}

	},

	render: function(){
		const {fields: {name, promocode, havePromocode, city, paymentType, phone }, handleSubmit, changePaymentType } = this.props;


		let form = <div>loading...</div>

		if (this.props.formLoading == false) {
			const fields = forms[paymentType.value].map(this.renderField);

			form = <div>
				<h2>Заполните данные</h2>
				<form onSubmit={handleSubmit(props => this.handleSumbit(props))}>

					{fields}

					<div>
						<button type="submit" >create order</button>
					</div>
				</form>
			</div>
		}

		return <div className="order-form">
			<div className="order-form__type">
				<h2>Способы оплаты</h2>
				<div>
					<RadioField label="Наличными" type="radio"  value="cash" name="paymentType" onChange={() => changePaymentType('cash')} checked={paymentType.value === 'cash'} />
					<RadioField label="Картой" type="radio"  value="card" name="paymentType" onChange={() => changePaymentType('card')} checked={paymentType.value === 'card'}  />
				</div>
			</div>
			<div className="order-form__form">
				{form}
			</div>
		</div>
	}
})


function validate(values){
	const errors = {};

	if (!values.name){
		errors.name = 'please enter name';
	}

	return errors;
}


OrderForm = reduxForm({ 
  form: 'orderForm',                           
  fields: [
  	'name', 'promocode', 'havePromocode', 'city', 'paymentType', 'phone',
  	'firstName', 'lastName', 'patronymic'
  ],
  validate
},
  state => ({
  	...state.orderForm,
  	initialValues: state.orderForm
  }),
  { loadCities, changePaymentType  }
)(OrderForm);



module.exports = OrderForm;

