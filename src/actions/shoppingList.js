import fetch from 'isomorphic-fetch';
import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    SL_FETCH_INGREDIENTS_FAILURE,
    SL_FETCH_INGREDIENTS_REQUEST,
    SL_FETCH_INGREDIENTS_SUCCESS
} from '../constants';

export function slReceiveIngredientsSuccess(data) {
    return {
        type: SL_FETCH_INGREDIENTS_SUCCESS,
        payload: {
            data
        }
    };
}

export function slReceiveIngredientsFailure(statusCode, errors) {
    return {
        type: SL_FETCH_INGREDIENTS_FAILURE,
        payload: {
            statusCode: statusCode,
            errors: errors
        }
    };
}

export function slFetchIngredientsRequest() {
    return {
        type: SL_FETCH_INGREDIENTS_REQUEST,
        payload: {}
    };
}

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

export function slFetchIngredients(urls) {
    return (dispatch, state) => {
        dispatch(slFetchIngredientsRequest());
        var myData = {
            recipeUrls: urls.split('\n')
        };
        return fetch(`${SERVER_URL}/get_ingredients/`, {
            method: 'post',
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(myData),
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                'Access-Control-Allow-Origin':'*',
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveProtectedData(response.data));
            })
            .catch((error) => {
                if (error && typeof error.response !== 'undefined' && error.response.status === 401) {
                    // Invalid authentication credentials
                    return error.response.json().then((data) => {
                        dispatch(slReceiveIngredientsFailure(401, data.non_field_errors[0]));
                    });
                } else if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    // Server side error
                    dispatch(slReceiveIngredientsFailure(500, 'A server error occurred while sending your data!'));
                } else {
                    // Most likely connection issues
                    dispatch(slReceiveIngredientsFailure('Connection Error', 'An error occurred while sending your data!'));
                }

                // dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
