import { createReducer } from '../utils';
import {
    SL_ADD_MORE_RECIPES,
    SL_CHANGE_RECIPES_AMOUNT,
    SL_FETCH_INGREDIENTS_FAILURE,
    SL_FETCH_INGREDIENTS_REQUEST,
    SL_FETCH_INGREDIENTS_SUCCESS
} from '../constants';


const initialState = {
    errors: null,
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
    [SL_CHANGE_RECIPES_AMOUNT]: (state, payload) => {
        return Object.assign({}, state, {
            shoppingList: payload.shoppingList,
            recipes: state.recipes.map(recipe => _.find(payload.recipeMultipliers, {url: recipe.url}) ?
                {...recipe, multiplier: _.find(payload.recipeMultipliers, {url: recipe.url}).multiplier } :
                recipe
        )
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
            shoppingList: payload.shoppingList,
            forReview: payload.reviewList,
            recipes: payload.recipes,
            statusText: 'Shopping List success'
        });
    },
    [SL_FETCH_INGREDIENTS_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            errors: payload.errors,
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
