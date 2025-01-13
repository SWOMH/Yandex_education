import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    UPDATE_BUNS,
    MOVE_INGREDIENT
} from '../actions/constructor';

const initialState = {
    buns: [],
    ingredients: [],
    counts: {}
};

const createUniqueId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const id = action.payload._id;
            return {
                ...state,
                ingredients: [...state.ingredients, { ...action.payload, uniqueId: createUniqueId() }],
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
