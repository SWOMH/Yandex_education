import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from '../actions/ingredient-details';

const initialState = {
    currentIngredient: null,
    isOpen: false
};

export const ingredientDetailsReducer = (state = initialState, action) => {
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