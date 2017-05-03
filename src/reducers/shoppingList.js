import { createReducer } from '../utils';
import {
    SL_FETCH_INGREDIENTS_FAILURE,
    SL_FETCH_INGREDIENTS_REQUEST,
    SL_FETCH_INGREDIENTS_SUCCESS
} from '../constants';


const initialState = {
    data: null,
    isFetching: false,
    statusText: null
};

export default createReducer(initialState, {
    [SL_FETCH_INGREDIENTS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            data: null
        });
    },
    [SL_FETCH_INGREDIENTS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            data: payload.data,
            statusText: 'You have been successfully logged in.' //Should i have this?
        });
    },
    [SL_FETCH_INGREDIENTS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            data: payload.data,
            statusText: `Error: ${payload.status} - ${payload.statusText}`
        });
    },
});
