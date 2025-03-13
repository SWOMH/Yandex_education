import { INGREDIENTS_ENDPOINT, fetchWithRefresh } from '../../utils/api-constants';
import { IIngredient } from '../../utils/types';
import { AppThunk, AppDispatch } from '../types/data';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: Array<IIngredient>;
}

export interface IGetIngredientsFailedAction {
  type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const getIngredients: AppThunk = () => {
    return async function(dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        try {
            const data = await fetchWithRefresh<IIngredient[]>(INGREDIENTS_ENDPOINT, {                
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET'
            });
            if (data.success && data.data) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data.data
                });
            }
        } catch (err) {
            console.error('Ошибка при получении ингредиентов:', err);
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
        }
    };
} 