import { combineReducers } from 'redux';
import { ingredientsReducer } from './reducers/ingredients';
import { constructorReducer } from './reducers/constructor';
import { orderReducer } from './reducers/order';
import { ingredientDetailsReducer } from './reducers/ingredient-details';
import { userReducer } from './reducers/user';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer,
    user: userReducer
});
