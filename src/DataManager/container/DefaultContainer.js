/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.06
 */
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import * as dataActions from '../store/actions/dataAction';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FileUploader from "../component/FileUploader";
import FileViewer from "../component/FileViewer";
import Footer from "../component/Footer";
import 'react-tabs/style/react-tabs.css';
import logo from '../image/yonsei_logo.png';

class DefaultContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0
		};

		this.getUploadParams = this.getUploadParams.bind(this);
		this.handleDataList = this.handleDataList.bind(this);
		this.handleDataDetail = this.handleDataDetail.bind(this);
	}

	render() {
		return (
			<div className="App">
				<header className="inline header">
					<img className="abr-logo" src={logo}></img>
					<h3>ABR AI Manager</h3>
				</header>
				<div className="content container">
					<Tabs className="content-inside" selectedIndex={this.state.index} onSelect={index => this.handleSetIndex(index)}>
						<TabList>
						<Tab>
							<span>AI 정보</span>
						</Tab>
						<Tab>
							<span>학습데이터</span>
						</Tab>
						<Tab>
							<span>업로드</span>
						</Tab>
						</TabList>
						<TabPanel>
						</TabPanel>
						<TabPanel>
							<FileViewer
								handleDataList={this.handleDataList}
								handleDataDetail={this.handleDataDetail}
								list={this.props.list}
								total={this.props.total}
								dataList={this.props.valueList}
							/>
						</TabPanel>
						<TabPanel>
							<FileUploader
								getUploadParams={this.getUploadParams}
								onChangeStatus={this.handleChangeStatus}
								onSubmit={this.handleSubmit}
							/>
						</TabPanel>
					</Tabs>
				</div>
				<Footer/>
			</div>
		)
	}

	handleSetIndex(index) {
		this.setState({index: index});
	}

	getUploadParams({ meta }) {
		console.log(this.props);
		return { url: this.props.defaultSetting.APIServer + "/abr/image/origin/upload" }
	}

	handleChangeStatus({ meta, file }, status) {
		console.log(status, meta, file)
	}

	handleSubmit(files) {
		console.log(files.map(f => f.meta))
	}

	handleDataList(page, itemPerPage) {
		this.props.DataActions.fetchListData(page, itemPerPage);
	}

	handleDataDetail(id) {
		this.props.DataActions.fetchDetailData(id);
	}
}

export default connect(
	(state) => ({
		defaultSetting: state.config.get("defaultSetting"),
		...state.data // bind data to props
	}),
	(dispatch) => ({
		DataActions: bindActionCreators(dataActions, dispatch) // bind dispatch to props
	})
)(DefaultContainer);