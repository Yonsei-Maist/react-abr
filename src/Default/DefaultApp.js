/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.06
 */
import React from 'react';
import ReactDOM from 'react-dom';

import DefaultContainer from './container/DefaultContainer';

import configureStore from './store';
import {Provider} from 'react-redux';
import rootSaga from './store/sagas';

import {setConfig} from './store/reducers/configReducer'

class DefaultApp {
	constructor(el) {
		this.el = el;
		this.store = configureStore();
        this.store.runSaga(rootSaga);
	}
	
	/**
	 * 화면 정보 초기화
	 */
	init(tag, defaultSetting) {
		this.store.dispatch(setConfig({
			defaultSetting:              defaultSetting
		}));
		
		ReactDOM.render(
			<Provider store={this.store}>
				<DefaultContainer
					onElementMounted={node => {
						this.loader = node;
					}}
				/>
			</Provider>, document.getElementById(tag));
	}
}

export default DefaultApp;