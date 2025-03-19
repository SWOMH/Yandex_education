import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    TIngredientsActions
} from '../actions/ingredients';
import { IIngredient } from '../../utils/types';

export type TIngredientsState = {
    ingredients: Array<IIngredient>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
  };

export const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredients: []
            };
        }
        default: {
            return state;
        }
    }
};
