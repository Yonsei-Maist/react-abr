/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.07
 */
import { call, spawn, put, takeEvery, select } from 'redux-saga/effects';
import * as actions from '../actions/defaultAction';
import axios from 'axios';
import { FETCH_DEFAULT } from '../types';

const getDefaultSetting = (state) => state.config;

function* fetchDefaultSaga() {
  
  try {
    let url = (yield select(getDefaultSetting)).get('defaultSetting').APIServer;
    // const { data } = yield call([axios, 'get'], url + '/defaultURL')
    
    //const { data } = yield axios.get(url + 'defaultURL');
    const { data } = yield axios.post(url + 'defaultURL', {});
    yield put(actions.fetchDefualtSuccess(data));
  } catch (error) {
    yield put(actions.fetchDefaultFailure(error.response));
  }
}

function* watchDefault() {
  /*
  takeEvery - get
  takeLatest - post, put ,delete
  */
  yield takeEvery(FETCH_DEFAULT, fetchDefaultSaga);
}

export { watchDefault };