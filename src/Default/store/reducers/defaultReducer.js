/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.07
 */
import { FETCH_DEFAULT, FETCH_DEFAULT_FAILURE, FETCH_DEFAULT_SUCCESS } from '../types';
import { handleActions} from 'redux-actions';

const initialState = {
	
};

export default handleActions({
	[FETCH_DEFAULT]:        (state, action) => ({
        ...state
    }),
	[FETCH_DEFAULT_SUCCESS]: (state, action) => ({
        ...state,
        ...action.payload
	}),
	[FETCH_DEFAULT_FAILURE]: (state, action) => ({
        ...state,
        action
	})
}, initialState);