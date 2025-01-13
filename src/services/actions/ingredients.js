import { INGREDIENTS_ENDPOINT, checkResponse } from '../../utils/api-constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
    return async function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        try {
            const response = await fetch(INGREDIENTS_ENDPOINT);
            const data = await checkResponse(response);
            if (data.success) {
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