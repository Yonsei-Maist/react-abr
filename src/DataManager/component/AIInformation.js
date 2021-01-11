/**
 * Show AI Learning Result
 * Run AI Learning and testing
 * 
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.08
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileViewer extends Component {
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

FileViewer.propTypes = {
	onEventListener: PropTypes.func.isRequired
};

FileViewer.defaultProps = {
	onEventListener: () => {
		console.log("not implement")
	}
};

export default FileViewer;