import moment from 'moment';
import jwtDecode from 'jwt-decode';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	token: '',
	email: '',
	userId: '',
	recipients: [],
	tokenExpire: '',
};

const setUserData = (state, action) => {
	const { token } = action;
	const decodedToken = jwtDecode(token);
	const tokenExpire = decodedToken.exp
		? moment.unix(decodedToken.exp).format('DD/MM/YYYY HH:mm')
		: moment().add('minutes', -1).format('DD/MM/YYYY HH:mm');
	localStorage.token = token;
	return {
		...state,
		token,
		email: decodedToken.email || '',
		userId: decodedToken.userId || '',
		tokenExpire,
	};
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER_DATA:
			return setUserData(state, action);
		default:
			return state;
	}
};

export default userReducer;
