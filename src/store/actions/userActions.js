import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';

import * as actionTypes from './actionTypes';
import { openErrorNotification } from '../../Utils/helper';

const setUserData = token => ({ type: actionTypes.SET_USER_DATA, token });
const setUserLogout = () => ({ type: actionTypes.SET_USER_LOGOUT });
const setRecipients = recipients => ({ type: actionTypes.SET_RECIPIENTS, recipients });

export const setTokenFromLocalstorage = (token, history) => dispatch => {
	axios.defaults.headers.authorization = `Bearer ${token}`;

	const decodedToken = jwtDecode(token);
	const tokenExpire = decodedToken.exp
		? moment.unix(decodedToken.exp).format('DD/MM/YYYY HH:mm')
		: moment().add('minutes', -1).format('DD/MM/YYYY HH:mm');

	if (moment(tokenExpire).isBefore(moment().format('DD/MM/YYYY HH:mm'))) {
		history.push('/login');
	} else if (
		history &&
		history.location &&
		(history.location.pathname === '/' || history.location.pathname === '/login')
	) {
		history.push('/message');
	}

	dispatch(setUserData(token));
};

export const checkEmail = email => async () => {
	if (!email) return false;
	let canCreate = false;
	try {
		const response = await axios.post('/user/checkEmail', { email });
		const { data } = response;
		const { isEmailAvail } = data;
		canCreate = isEmailAvail;
	} catch (err) {
		openErrorNotification('Error', 'Something went wrong');
	}
	return canCreate;
};

export const userCreate = ({ email, password }, history) => async dispatch => {
	try {
		const response = await axios.put('/user/create', { email, password });
		const { data } = response;
		const { token } = data;
		axios.defaults.headers.authorization = `Bearer ${token}`;
		dispatch(setUserData(token));
		history.push('/message');
	} catch (err) {
		return false;
	}
};

export const userLogin = ({ email, password }, history) => async dispatch => {
	try {
		const response = await axios.post('/user/login', { email, password });
		const { data } = response;
		const { token } = data;
		axios.defaults.headers.authorization = `Bearer ${token}`;
		dispatch(setUserData(token));
		history.push('/message');
	} catch (err) {
		if (err && err.response && err.response.status === 401) {
			return false;
		}
	}
};

export const userLogout = history => async dispatch => {
	axios.defaults.headers.authorization = '';
	localStorage.clear();
	dispatch(setUserLogout());
	history.push('/login');
};

export const userGetRecipients = () => async dispatch => {
	try {
		const response = await axios.get('/user/recipients');
		const { data } = response;
		const { recipients } = data;
		dispatch(setRecipients(recipients));
	} catch (err) {
		openErrorNotification('Error', 'Something went wrong');
	}
};
