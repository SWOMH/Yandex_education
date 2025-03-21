import { IIngredient } from '../../utils/types';
import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    UPDATE_BUNS,
    MOVE_INGREDIENT,
    IAddIngredientPayload,
    TConstructorActions
} from '../actions/constructor';

interface IConstructorState {
    buns: IIngredient[];
    ingredients: IAddIngredientPayload[];
    counts: { [key: string]: number };
}

const initialState: IConstructorState = {
    buns: [],
    ingredients: [],
    counts: {}
};

export const constructorReducer = (state = initialState, action: TConstructorActions) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const id = action.payload._id;
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
                counts: {
                    ...state.counts,
                    [id]: (state.counts[id] || 0) + 1
                }
            };
        }
        case DELETE_INGREDIENT: {
            const { index, ingredientId } = action.payload;
            return {
                ...state,
                ingredients: state.ingredients.filter((_, idx) => idx !== index),
                counts: {
                    ...state.counts,
                    [ingredientId]: Math.max(0, (state.counts[ingredientId] || 0) - 1)
                }
            };
        }
        case UPDATE_BUNS: {
            const newBunId = action.payload._id;
            const oldBunId = state.buns[0]?._id;
            
            return {
                ...state,
                buns: [action.payload],
                counts: {
                    ...state.counts,
                    ...(oldBunId && { [oldBunId]: 0 }),
                    [newBunId]: 2
                }
            };
        }
        case MOVE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            const { dragIndex, hoverIndex } = action.payload;
            const dragItem = ingredients[dragIndex];
            ingredients.splice(dragIndex, 1);
            ingredients.splice(hoverIndex, 0, dragItem);
            return {
                ...state,
                ingredients
            };
        }
        default: {
            return state;
        }
    }
};
