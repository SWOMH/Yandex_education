import { combineReducers } from 'redux';
import { ingredientsReducer } from './reducers/ingredients';
import { constructorReducer } from './reducers/constructor';
import { orderReducer } from './reducers/order';
import { ingredientDetailsReducer } from './reducers/ingredient-details';
import { userReducer } from './reducers/user';
import { wsReducer } from './reducers/ws-reducer';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer,
    user: userReducer,
    ws: wsReducer
});

export type RootState = ReturnType<typeof rootReducer>
