import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import '@babel/polyfill';

import App from './App';

import 'antd/dist/antd.css';
import './style.scss';

axios.defaults.baseURL = 'https://u5d6gnw6aj.execute-api.us-east-1.amazonaws.com/api';
axios.defaults.headers.common = axios.defaults.headers.common = {
	'X-API-Key': 'VXUsgQ2jsq3EM30icjHA91tETkqFwtXDak07xebM',
};

ReactDOM.render(<App />, document.getElementById('root'));
