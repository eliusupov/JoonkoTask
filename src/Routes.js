import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

import SystemEntry from './Containers/SystemEntry/SystemEntry';

const routes = props => {
	return (
		<>
			<Route exact path="/" component={SystemEntry} />
		</>
	);
};

routes.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func,
	}).isRequired,
};

export default withRouter(routes);
