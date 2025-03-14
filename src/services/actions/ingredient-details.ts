import { IIngredient } from "../../utils/types";

export const OPEN_INGREDIENT_DETAILS: 'OPEN_INGREDIENT_DETAILS' = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS: 'CLOSE_INGREDIENT_DETAILS' = 'CLOSE_INGREDIENT_DETAILS';


export interface IOpenIngredientDetails {
    type: typeof OPEN_INGREDIENT_DETAILS;
    payload: IIngredient;
}

export interface ICloseIngredientDetails {
    type: typeof CLOSE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = 
  | IOpenIngredientDetails
  | ICloseIngredientDetails


export const openIngredientDetails = (ingredient: IIngredient): IOpenIngredientDetails => {
    return {
        type: OPEN_INGREDIENT_DETAILS,
        payload: ingredient
    };
};

export const closeIngredientDetails = (): ICloseIngredientDetails => {
    return {
        type: CLOSE_INGREDIENT_DETAILS
    };
}; 