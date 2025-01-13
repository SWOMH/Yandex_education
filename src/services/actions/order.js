import { ORDER_ENDPOINT, checkResponse } from '../../utils/api-constants.js';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';

export const orderBurger = (ingredients) => {
    return async (dispatch) => {
        dispatch({ type: ORDER_REQUEST });
        try {
            const response = await fetch(ORDER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients }),
            });
            const data = await checkResponse(response);
            if (data.success) {
                dispatch({ type: ORDER_SUCCESS, order: data });
            } else {
                dispatch({ type: ORDER_FAILED });
            }
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            dispatch({ type: ORDER_FAILED });
        }
    };
}; 