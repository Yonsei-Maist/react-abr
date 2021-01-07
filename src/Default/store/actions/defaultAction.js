/**
 *
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.07
 */
import {FETCH_DEFAULT, FETCH_DEFAULT_SUCCESS, FETCH_DEFAULT_FAILURE} from"../types"

export const fetchDefault = () => ({
    type: FETCH_DEFAULT,
});

export const fetchDefualtSuccess = (data) => ({
    type: FETCH_DEFAULT_SUCCESS,
    payload: data,
});

export const fetchDefaultFailure = (error) => ({
    type: FETCH_DEFAULT_FAILURE,
    error,
});