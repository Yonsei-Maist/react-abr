/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.07
 */
import { call, spawn, put, takeEvery, select } from 'redux-saga/effects';
import * as actions from '../actions/dataAction';
import axios from 'axios';
import { FETCH_DETAIL_DATA, FETCH_LIST_DATA } from '../types';

const getDefaultSetting = (state) => state.config;

function* fetchDataListSaga(action) {
  
  try {
    let url = (yield select(getDefaultSetting)).get('defaultSetting').APIServer;
    // const { data } = yield call([axios, 'get'], url + '/defaultURL')
    const param = action.payload;
    //const { data } = yield axios.get(url + 'defaultURL');
    const { data } = yield axios.get(url + '/abr/image/data/' + param.page + "/" + param.perPage);
    if (data.result == "success")
      yield put(actions.fetchListDataSuccess(data));
    else
      yield put(actions.fetchListDataFailure(data));
  } catch (error) {
    yield put(actions.fetchListDataFailure(error.response));
  }
}

function* watchDataList() {
  /*
  takeEvery - get
  takeLatest - post, put ,delete
  */
  yield takeEvery(FETCH_LIST_DATA, fetchDataListSaga);
}

function* fetchDataDetailSaga(action) {
  
  try {
    let url = (yield select(getDefaultSetting)).get('defaultSetting').APIServer;
    // const { data } = yield call([axios, 'get'], url + '/defaultURL')
    const param = action.payload;
    //const { data } = yield axios.get(url + 'defaultURL');
    const { data } = yield axios.get(url + '/abr/image/data/one/' + param.id_data);
    if (data.result == "success")
      yield put(actions.fetchDetailDataSuccess(data));
    else
      yield put(actions.fetchDetailDataFailure(data));
  } catch (error) {
    yield put(actions.fetchDetailDataFailure(error.response));
  }
}

function* watchDataDetail() {
  yield takeEvery(FETCH_DETAIL_DATA, fetchDataDetailSaga);
}

export { watchDataList, watchDataDetail};