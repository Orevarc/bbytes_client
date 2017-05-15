import { createReducer } from '../utils';
import {
    ING_FETCH_BASE_INGREDIENTS_FAILURE,
    ING_FETCH_BASE_INGREDIENTS_REQUEST,
    ING_FETCH_BASE_INGREDIENTS_SUCCESS,
    ING_FETCH_INGREDIENT_CATEGORIES_SUCCESS,
    ING_POST_INGREDIENT_MAPPING_REQUEST,
    ING_POST_INGREDIENT_MAPPING_SUCCESS,
    ING_POST_INGREDIENT_MAPPING_FAILURE
} from '../constants';


const initialState = {
    ingredientCategories: [],
    baseIngredients: [],
    statusText: null
};

export default createReducer(initialState, {
    [ING_FETCH_BASE_INGREDIENTS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            baseIngredients: [],
            statusText: null
        });
    },
    [ING_FETCH_BASE_INGREDIENTS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            baseIngredients: payload.data,
            statusText: 'Base Ingredients fecthed successfully'
        });
    },
    [ING_FETCH_BASE_INGREDIENTS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            baseIngredients: null,
            statusText: `Error: ${payload.status} - ${payload.statusText}`
        });
    },
    [ING_POST_INGREDIENT_MAPPING_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            statusText: null
        });
    },
    [ING_POST_INGREDIENT_MAPPING_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            statusText: 'Ingredient Mapping created successfully'
        });
    },
    [ING_POST_INGREDIENT_MAPPING_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            statusText: `Error: ${payload.status} - ${payload.statusText}`
        });
    },
    [ING_FETCH_INGREDIENT_CATEGORIES_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            ingredientCategories: payload.data,
            statusText: 'Ingredient Categories fecthed successfully'
        });
    },
});
