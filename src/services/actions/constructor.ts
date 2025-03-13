import { IIngredient } from "../../utils/types";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const UPDATE_BUNS: 'UPDATE_BUNS' = 'UPDATE_BUNS';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';



export interface IAddIngredientPayload extends IIngredient {
    uniqueId: string; 
}

export interface IDeleteIngredientPayload {
    index: number;
    ingredientId: string;
}

export interface IMoveIngredientPayload {
    dragIndex: number;
    hoverIndex: number;
}

export interface IAddIngredientAction {
    type: typeof ADD_INGREDIENT;
    payload: IAddIngredientPayload;
}

export interface IDeleteIngredientAction {
    type: typeof DELETE_INGREDIENT;
    payload: IDeleteIngredientPayload;
}

export interface IUpdateBunsAction {
    type: typeof UPDATE_BUNS;
    payload: IIngredient;
}

export interface IMoveIngredientAction {
    type: typeof MOVE_INGREDIENT;
    payload: IMoveIngredientPayload;
}

export type TConstructorActions =
    | IAddIngredientAction
    | IDeleteIngredientAction
    | IUpdateBunsAction
    | IMoveIngredientAction;


const createUniqueId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const addIngredient = (ingredient: IIngredient): IAddIngredientAction => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...ingredient,
            uniqueId: createUniqueId()
        }
    };
};

export const deleteIngredient = (index: number, ingredientId: string): IDeleteIngredientAction => {
    return {
        type: DELETE_INGREDIENT,
        payload: { 
            index, 
            ingredientId
        }
    };
};

export const updateBuns = (bun: IIngredient): IUpdateBunsAction => {
    return {
        type: UPDATE_BUNS,
        payload: bun
    };
};

export const moveIngredient = (dragIndex: number, hoverIndex: number): IMoveIngredientAction => {
    return {
        type: MOVE_INGREDIENT,
        payload: {
            dragIndex,
            hoverIndex
        }
    };
};