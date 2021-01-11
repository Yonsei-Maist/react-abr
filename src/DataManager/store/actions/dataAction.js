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

export const fetchListData = (page, itemPerPage) => ({
    type: FETCH_LIST_DATA,
    payload: {
        id: 11,
        page: page,
        perPage: itemPerPage
    }
});

export const fetchListDataSuccess = (data) => ({
    type: FETCH_LIST_DATA_SUCCESS,
    payload: data,
});

export const fetchListDataFailure = (error) => ({
    type: FETCH_LIST_DATA_FAILURE,
    error,
});

export const fetchDetailData = (id) => ({
    type: FETCH_DETAIL_DATA,
    payload: {
        id_data: id
    }
});

export const fetchDetailDataSuccess = (data) => ({
    type: FETCH_DETAIL_DATA_SUCCESS,
    payload: data,
});

export const fetchDetailDataFailure = (error) => ({
    type: FETCH_DETAIL_DATA_FAILURE,
    error,
});