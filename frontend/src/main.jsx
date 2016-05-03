
import React from 'react'
import { render } from 'react-dom'
const routes = require('./routes');

import { checkAuth } from './actions';

import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import createHistory from 'history/lib/createHashHistory';
//'history/lib/createBrowserHistory';



import rootReducer from 'reducers';
import {reduxReactRouter} from 'redux-router';

let createStoreWithMiddleware;

const middleware = applyMiddleware(thunk);

createStoreWithMiddleware = compose(
 middleware,
 reduxReactRouter({routes, createHistory})
);

const store = createStoreWithMiddleware(createStore)(rootReducer);

// const store = createStore(rootReducer)

render((
	<div>
		<Provider store={store}>
			<div>
				<ReduxRouter>
					{routes}
				</ReduxRouter>
			</div>
		</Provider>
	</div>
), document.getElementById('app'))


store.dispatch(checkAuth());

