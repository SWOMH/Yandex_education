export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const openIngredientDetails = (ingredient) => {
    return {
        type: OPEN_INGREDIENT_DETAILS,
        payload: ingredient
    };
};

export const closeIngredientDetails = () => {
    return {
        type: CLOSE_INGREDIENT_DETAILS
    };
}; 