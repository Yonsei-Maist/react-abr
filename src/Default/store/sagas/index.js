/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.06
 */
import * as defaultSaga from './defaultSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
    const [watchDefault] = yield all([
        defaultSaga.watchDefault()
    ]);
}