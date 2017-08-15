import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    SL_ADD_MORE_RECIPES,
    SL_CHANGE_RECIPES_AMOUNT,
    SL_REMOVE_RECIPE,
    SL_FETCH_INGREDIENTS_FAILURE,
    SL_FETCH_INGREDIENTS_REQUEST,
    SL_FETCH_INGREDIENTS_SUCCESS
} from '../constants';

import { displayNotification } from './global';
import { bulkChangeRecipeIngredientAmounts } from '../utils/recipes';

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function slAddMoreRecipes() {
    return (dispatch, state) => {
        return dispatch({
            type: SL_ADD_MORE_RECIPES,
        });
    };
}

export function slRemoveRecipe(url) {

}

// Changing Recipe Amounts
export function slChangeRecipesAmount(recipeMultipliers) {
    return (dispatch, state) => {
        let shoppingList = state().shoppingList.shoppingList;
        const recipes = state().shoppingList.recipes;
        shoppingList = bulkChangeRecipeIngredientAmounts(shoppingList, recipes, recipeMultipliers);
        dispatch(displayNotification('Success', 'Recipe amounts successfully changed', 'success'));
        return dispatch({
            type: SL_CHANGE_RECIPES_AMOUNT,
            payload: {
                recipeMultipliers: recipeMultipliers,
                shoppingList: shoppingList
            }
        });
    };
}

// Fetching Shopping List
export function slReceiveIngredientsSuccess(data) {
    return {
        type: SL_FETCH_INGREDIENTS_SUCCESS,
        payload: {
            'shoppingList': data.shopping_list,
            'reviewList': data.review_list,
            'recipes': data.recipes
        }
    };
}

export function slReceiveIngredientsFailure(errors) {
    return {
        type: SL_FETCH_INGREDIENTS_FAILURE,
        payload: {
            errors: errors
        }
    };
}

export function slFetchIngredientsRequest(urls) {
    return {
        type: SL_FETCH_INGREDIENTS_REQUEST,
        payload: {
            urls
        }
    };
}

export function slFetchIngredients(urls) {
    return (dispatch, state) => {
        dispatch(slFetchIngredientsRequest(urls));
        var myData = {
            recipeUrls: urls.split('\n')
        };
        return fetch(`${SERVER_URL}/shopping_list/`, {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(myData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(slReceiveIngredientsSuccess(response));
                dispatch(displayNotification('Success', 'Shopping list generated', 'success'));
            })
            .catch((error) => {
                console.log(error)
                if (error && typeof error.response !== 'undefined' && error.response.status === 400) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(slReceiveIngredientsFailure(data));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(slReceiveIngredientsFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(slReceiveIngredientsFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}