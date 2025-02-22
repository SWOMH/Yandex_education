export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_BUNS = 'UPDATE_BUNS';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

const createUniqueId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            uniqueId: createUniqueId()
        }
    };
};

export const deleteIngredient = (index, ingredientId) => {
    return {
        type: DELETE_INGREDIENT,
        payload: { 
            index, 
            ingredientId
        }
    };
};

export const updateBuns = (bun) => {
    return {
        type: UPDATE_BUNS,
        payload: bun
    };
};

export const moveIngredient = (dragIndex, hoverIndex) => {
    return {
        type: MOVE_INGREDIENT,
        payload: {
            dragIndex,
            hoverIndex
        }
    };
};