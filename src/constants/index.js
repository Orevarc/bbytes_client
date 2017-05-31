// App
export const GLOBAL_APP_NAME = 'BBytes';
export const GLOBAL_DESCRIP = 'Shopping List Generator';


// Authorization
export const AUTH_LOGIN_USER_REQUEST = 'AUTH_LOGIN_USER_REQUEST';
export const AUTH_LOGIN_USER_FAILURE = 'AUTH_LOGIN_USER_FAILURE';
export const AUTH_LOGIN_USER_SUCCESS = 'AUTH_LOGIN_USER_SUCCESS';
export const AUTH_LOGOUT_USER = 'AUTH_LOGOUT_USER';

// API
export const DATA_FETCH_PROTECTED_DATA_REQUEST = 'DATA_FETCH_PROTECTED_DATA_REQUEST';
export const DATA_RECEIVE_PROTECTED_DATA = 'DATA_RECEIVE_PROTECTED_DATA';

// Shopping List
// -- For fetching ingredient list
export const SL_ADD_MORE_RECIPES = 'SL_ADD_MORE_RECIPES';
export const SL_CHANGE_RECIPE_AMOUNT = 'SL_CHANGE_RECIPE_AMOUNT';
export const SL_FETCH_INGREDIENTS_FAILURE = 'SL_FETCH_INGREDIENTS_FAILURE';
export const SL_FETCH_INGREDIENTS_REQUEST = 'SL_FETCH_INGREDIENTS_REQUEST';
export const SL_FETCH_INGREDIENTS_SUCCESS = 'SL_FETCH_INGREDIENTS_SUCCESS';

// -- For fetching base ingredients
export const ING_FETCH_BASE_INGREDIENTS_REQUEST = 'ING_FETCH_BASE_INGREDIENTS_REQUEST';
export const ING_FETCH_BASE_INGREDIENTS_SUCCESS = 'ING_FETCH_BASE_INGREDIENTS_SUCCESS';
export const ING_FETCH_BASE_INGREDIENTS_FAILURE = 'ING_FETCH_BASE_INGREDIENTS_FAILURE';
export const ING_POST_BASE_INGREDIENT_REQUEST = 'ING_POST_BASE_INGREDIENT_REQUEST';
export const ING_POST_BASE_INGREDIENT_SUCCESS = 'ING_POST_BASE_INGREDIENT_SUCCESS';
export const ING_POST_BASE_INGREDIENT_FAILURE = 'ING_POST_BASE_INGREDIENT_FAILURE';

// -- For posting ingredient mappings
export const ING_POST_INGREDIENT_MAPPING_REQUEST = 'ING_FETCH_INGREDIENT_MAPPING_REQUEST';
export const ING_POST_INGREDIENT_MAPPING_SUCCESS = 'ING_FETCH_INGREDIENT_MAPPING_SUCCESS';
export const ING_POST_INGREDIENT_MAPPING_FAILURE = 'ING_FETCH_INGREDIENT_MAPPING_FAILURE';

// -- Fetching Ingredient Categories
export const ING_FETCH_INGREDIENT_CATEGORIES_SUCCESS = 'ING_FETCH_INGREDIENT_CATEGORIES_SUCCESS';


// Ingredients
export const INGREDIENT_CATEGORIES = {
	BAKING: 'Baking',
    BREAD: 'Bread',
    CANNED: 'Canned',
    DAIRY: 'Dairy',
    HERB: 'Herb',
    FROZEN: 'Frozen',
    FRUIT: 'Fruit',
    NUT: 'Nut',
    MEAT: 'Meat',
    MISC: 'Misc.',
    OTHER: 'Other',
    SEAFOOD: 'Seafood',
    SPICE: 'Spice',
    VEGETABLE:'Vegetable'
}