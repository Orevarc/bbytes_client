import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    ING_FETCH_BASE_INGREDIENTS_FAILURE,
    ING_FETCH_BASE_INGREDIENTS_REQUEST,
    ING_FETCH_BASE_INGREDIENTS_SUCCESS,
    ING_FETCH_INGREDIENT_CATEGORIES_SUCCESS,
	ING_POST_BASE_INGREDIENT_REQUEST,
	ING_POST_BASE_INGREDIENT_SUCCESS,
	ING_POST_BASE_INGREDIENT_FAILURE,
    ING_POST_INGREDIENT_MAPPING_REQUEST,
    ING_POST_INGREDIENT_MAPPING_SUCCESS,
    ING_POST_INGREDIENT_MAPPING_FAILURE
} from '../constants';

import { displayNotification } from './global';

// Fetching Base Ingredients
export function ingFetchBaseIngredientsRequest() {
    return {
        type: ING_FETCH_BASE_INGREDIENTS_REQUEST,
        payload: ''
    };
}

export function ingFetchBaseIngredientsFailure(statusCode, errors) {
    return {
        type: ING_FETCH_BASE_INGREDIENTS_FAILURE,
        payload: {
            statusCode: statusCode,
            errors: errors
        }
    };
}

export function ingReceiveBaseIngredientsSuccess(data) {
    return {
        type: ING_FETCH_BASE_INGREDIENTS_SUCCESS,
        payload: {
            data
        }
    };
}

export function ingFetchBaseIngredients() {
    return (dispatch, state) => {
        dispatch(ingFetchBaseIngredientsRequest());
        return fetch(`${SERVER_URL}/base_ingredients/`, {
            method: 'get',
            mode: 'cors',
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(ingReceiveBaseIngredientsSuccess(response.baseIngredients));
            })
            .catch((error) => {
                console.log(error)
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(ingFetchBaseIngredientsFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(ingFetchBaseIngredientsFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(ingFetchBaseIngredientsFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                // dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// Posting Base Ingredients
export function ingPostBaseIngredientRequest() {
    return {
        type: ING_POST_INGREDIENT_MAPPING_REQUEST,
        payload: ''
    };
}

export function ingPostBaseIngredientFailure(statusCode, errors) {
    return {
        type: ING_POST_INGREDIENT_MAPPING_FAILURE,
        payload: {
            statusCode: statusCode,
            errors: errors
        }
    };
}

export function ingPostBaseIngredientSuccess(data) {
    return {
        type: ING_POST_INGREDIENT_MAPPING_SUCCESS,
        payload: {
            data
        }
    };
}

export function ingPostBaseIngredient(name, category) {
    return (dispatch, state) => {
        dispatch(ingPostBaseIngredientRequest());
        return fetch(`${SERVER_URL}/base_ingredients/`, {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify({
            	name: name,
            	category: category
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(ingPostBaseIngredientSuccess(response));
                dispatch(ingFetchBaseIngredients());
                dispatch(displayNotification('Success', 'Ingredient sucessfully added', 'success'));
            })
            .catch((error) => {
                console.log(error)
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(ingPostBaseIngredientFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(ingPostBaseIngredientFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(ingPostBaseIngredientFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                // dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// Posting Ingredient Mappings
export function ingPostIngredientMappingRequest() {
    return {
        type: ING_POST_INGREDIENT_MAPPING_REQUEST,
        payload: ''
    };
}

export function ingPostIngredientMappingFailure(statusCode, errors) {
    return {
        type: ING_POST_INGREDIENT_MAPPING_FAILURE,
        payload: {
            statusCode: statusCode,
            errors: errors
        }
    };
}

export function ingPostIngredientMappingSuccess(data) {
    return {
        type: ING_POST_INGREDIENT_MAPPING_SUCCESS,
        payload: {
            data
        }
    };
}

export function ingPostIngredientMapping(ingredientMapping) {
    return (dispatch, state) => {
        dispatch(ingPostIngredientMappingRequest());
        return fetch(`${SERVER_URL}/ingredient_mappings/`, {
            method: 'post',
            mode: 'cors',
            body: JSON.stringify(ingredientMapping),
            headers: {
                'Content-Type': 'application/json',
            }
        })

            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(ingPostIngredientMappingSuccess(response));
                dispatch(displayNotification('Success', 'Ingredient sucessfully mapped', 'success'));
            })
            .catch((error) => {
                console.log(error)
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(ingPostIngredientMappingFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(ingPostIngredientMappingFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(ingPostIngredientMappingFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                // dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}

// Fetching Ingredient Categories
export function ingFetchIngredientCategoriesSuccess(data) {
    return {
        type: ING_FETCH_INGREDIENT_CATEGORIES_SUCCESS,
        payload: {
            data
        }
    };
}

export function ingFetchIngredientCategories() {
    return (dispatch, state) => {
        return fetch(`${SERVER_URL}/ingredient_categories/`, {
            method: 'get',
            mode: 'cors',
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(ingFetchIngredientCategoriesSuccess(response.categories));
                return Promise.resolve(response.categories);
            })
            .catch((error) => {
                console.log(error);
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}


