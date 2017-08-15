import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from './auth';
import globalReducer from './global';
import ingredientsReducer from './ingredients';
import shoppingListReducer from './shoppingList';

export default combineReducers({
    auth: authReducer,
    global: globalReducer,
    shoppingList: shoppingListReducer,
    ingredients: ingredientsReducer,
    routing: routerReducer
});
