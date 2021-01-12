/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.07
 */
import { 
        FETCH_LIST_DATA, 
        FETCH_LIST_DATA_FAILURE, 
        FETCH_LIST_DATA_SUCCESS,
        FETCH_DETAIL_DATA, 
        FETCH_DETAIL_DATA_FAILURE, 
        FETCH_DETAIL_DATA_SUCCESS 
} from '../types';
import { handleActions} from 'redux-actions';

const initialState = {
        total: 0,
        list: [],
        valueList: [],
        image: '',
        imageSize: {
                height: 0,
                width: 0
        }
};

export default handleActions({
        [FETCH_LIST_DATA]: (state, action) => ({
                ...state
        }),
        [FETCH_LIST_DATA_SUCCESS]: (state, action) => ({
                ...state,
                ...action.payload.data
        }),
        [FETCH_LIST_DATA_FAILURE]: (state, action) => ({
                ...state,
                action
        }),
        [FETCH_DETAIL_DATA]: (state, action) => ({
                ...state
        }),
        [FETCH_DETAIL_DATA_SUCCESS]: (state, action) => ({
                ...state,
                ...action.payload.data
        }),
        [FETCH_DETAIL_DATA_FAILURE]: (state, action) => ({
                ...state,
                action
        })
}, initialState);