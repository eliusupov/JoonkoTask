import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import reducers from './src/store/reducers/reducers';

import Routes from './src/Routes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Routes />
				</Switch>
			</BrowserRouter>
		</Provider>
	);
};

export default hot(App);
