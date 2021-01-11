/**
 * 
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.08
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

class FileUploader extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div> 
				<Dropzone
					getUploadParams={this.props.getUploadParams}
					onChangeStatus={this.props.onChangeStatus}
					onSubmit={this.props.onSubmit}
                    accept="image/*,audio/*,video/*"
				/>
			</div>
		)
	}
}

FileUploader.propTypes = {
	onEventListener: PropTypes.func.isRequired,
	onChangeStatus: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

FileUploader.defaultProps = {
	getUploadParams: () => {
		console.log("not implement")
	},
	onChangeStatus: () => {
		console.log("not implement")
	},
	onSubmit: () => {
		console.log("not implement")
	}
};

export default FileUploader;