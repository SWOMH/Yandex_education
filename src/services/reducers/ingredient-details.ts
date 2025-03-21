import { IIngredient } from '../../utils/types';
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS, TIngredientDetailsActions } from '../actions/ingredient-details';



export type TIngredientDetailsState = {
    currentIngredient: IIngredient | null;
    isOpen: boolean
};
  

export const initialState: TIngredientDetailsState = {
    currentIngredient: null,
    isOpen: false
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
    switch (action.type) {
        case OPEN_INGREDIENT_DETAILS: {
            return {
                ...state,
                currentIngredient: action.payload,
                isOpen: true
            };
        }
        case CLOSE_INGREDIENT_DETAILS: {
            return {
                ...state,
                currentIngredient: null,
                isOpen: false
            };
        }
        default: {
            return state;
        }
    }
}; 