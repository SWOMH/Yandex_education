import { ORDER_ENDPOINT, fetchWithRefresh } from '../../utils/api-constants';

export const ORDER_REQUEST = 'ORDER_REQUEST';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILED = 'ORDER_FAILED';

export const orderBurger = (ingredients) => {
    return async (dispatch) => {
        dispatch({ type: ORDER_REQUEST });
        try {
            const accessToken = localStorage.getItem('accessToken');
            const data = await fetchWithRefresh(ORDER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                body: JSON.stringify({ ingredients }),
            });
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