import { createReducer } from '../utils';
import {
    SL_ADD_MORE_RECIPES,
    SL_CHANGE_RECIPE_AMOUNT,
    SL_FETCH_INGREDIENTS_FAILURE,
    SL_FETCH_INGREDIENTS_REQUEST,
    SL_FETCH_INGREDIENTS_SUCCESS
} from '../constants';


const initialState = {
    recipeUrls: '',
    recipes: [],
    baseIngredients: [],
    forReview: [],
    shoppingList: null,
    isFetching: false,
    inputtingRecipes: true,
    statusText: null
};

export default createReducer(initialState, {
    [SL_ADD_MORE_RECIPES]: (state, payload) => {
        return Object.assign({}, state, {
            inputtingRecipes: true,
            shoppingList: null,
            forReview: null,
        });
    },
    [SL_CHANGE_RECIPE_AMOUNT]: (state, payload) => {
        return Object.assign({}, state, {
            shoppingList: payload.shoppingList
        });
    },
    [SL_FETCH_INGREDIENTS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true,
            recipeUrls: payload.urls,
            recipes: [],
            inputtingRecipes: true,
            shoppingList: null,
            forReview: null,
            statusText: null
        });
    },
    [SL_FETCH_INGREDIENTS_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            inputtingRecipes: false,
            shoppingList: payload.shoppingList.item_list,
            forReview: payload.shoppingList.for_review,
            recipes: payload.recipes,
            statusText: 'Shopping List success'
        });
    },
    [SL_FETCH_INGREDIENTS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: false,
            recipeUrls: [],
            recipes: [],
            inputtingRecipes: true,
            shoppingList: null,
            forReview: null,
            statusText: `Error: ${payload.status} - ${payload.statusText}`
        });
    },
});
