/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.06
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
			</div>
		)
	}
}

DefaultComponent.propTypes = {
	onEventListener: PropTypes.func.isRequired
};

DefaultComponent.defaultProps = {
	onEventListener: () => {
		console.log("not implement")
	}
};

export default DefaultComponent;