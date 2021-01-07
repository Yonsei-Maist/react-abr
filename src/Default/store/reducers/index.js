/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.06
 */
import { combineReducers } from 'redux';

import config from './configReducer';
import defaultReducer from './defaultReducer';

const rootReducer = combineReducers({
    config: config,
    default: defaultReducer
});

export default rootReducer;