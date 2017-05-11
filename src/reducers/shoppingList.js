import { createReducer } from '../utils';
import {
    SL_FETCH_INGREDIENTS_FAILURE,
    SL_FETCH_INGREDIENTS_REQUEST,
    SL_FETCH_INGREDIENTS_SUCCESS
} from '../constants';


const initialState = {
    baseIngredients: [],
    shoppingList: null,
    isFetching: false,
    inputtingRecipes: true,
    statusText: null
};

export default createReducer(initialState, {
    [SL_FETCH_INGREDIENTS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            inputtingRecipes: true,
            shoppingList: null,
            statusText: null
        });
    },
    [SL_FETCH_INGREDIENTS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            inputtingRecipes: false,
            shoppingList: payload.data,
            statusText: 'Shopping List success'
        });
    },
    [SL_FETCH_INGREDIENTS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            inputtingRecipes: true,
            shoppingList: null,
            statusText: `Error: ${payload.status} - ${payload.statusText}`
        });
    },
});
