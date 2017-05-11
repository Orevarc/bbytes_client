import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import dataReducer from './data';
import ingredientsReducer from './ingredients';
import shoppingListReducer from './shoppingList';

export default combineReducers({
    auth: authReducer,
    data: dataReducer,
    shoppingList: shoppingListReducer,
    ingredients: ingredientsReducer,
    routing: routerReducer
});
