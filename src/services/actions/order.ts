import { ORDER_ENDPOINT, fetchWithRefresh, NORMA_API } from '../../utils/api-constants';
import { IIngredient, TOrder } from '../../utils/types';
import { AppDispatch, AppThunk } from '../types/data';

export const ORDER_REQUEST: 'ORDER_REQUEST' = 'ORDER_REQUEST';
export const ORDER_SUCCESS: 'ORDER_SUCCESS' = 'ORDER_SUCCESS';
export const ORDER_FAILED: 'ORDER_FAILED' = 'ORDER_FAILED';

export const GET_ORDER_BY_NUMBER_REQUEST = 'GET_ORDER_BY_NUMBER_REQUEST';
export const GET_ORDER_BY_NUMBER_SUCCESS = 'GET_ORDER_BY_NUMBER_SUCCESS';
export const GET_ORDER_BY_NUMBER_FAILED = 'GET_ORDER_BY_NUMBER_FAILED';

export interface IOrderRequest {
    type: typeof ORDER_REQUEST;
}

export interface IOrderSuccess {
    type: typeof ORDER_SUCCESS;
    order: number;
}

export interface IOrderFailed {
    type: typeof ORDER_FAILED;
}

export interface IGetOrderByNumberRequest {
    type: typeof GET_ORDER_BY_NUMBER_REQUEST;
}

export interface IGetOrderByNumberSuccess {
    type: typeof GET_ORDER_BY_NUMBER_SUCCESS;
    payload: TOrder;
}

export interface IGetOrderByNumberFailed {
    type: typeof GET_ORDER_BY_NUMBER_FAILED;
}

export type TOrderActions =
  | IOrderRequest
  | IOrderSuccess
  | IOrderFailed
  | IGetOrderByNumberRequest
  | IGetOrderByNumberSuccess
  | IGetOrderByNumberFailed;

export const orderBurger: AppThunk = (ingredients: IIngredient) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: ORDER_REQUEST });
        try {
            const accessToken = localStorage.getItem('accessToken');
            const data = await fetchWithRefresh(ORDER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { authorization: accessToken })
                },
                body: JSON.stringify({ ingredients }),
            });
            if (data.success) {
                dispatch({ type: ORDER_SUCCESS, order: data.order.number });
            } else {
                dispatch({ type: ORDER_FAILED });
            }
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            dispatch({ type: ORDER_FAILED });
        }
    };
};

export const getOrderByNumber: AppThunk = (orderNumber: number) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: GET_ORDER_BY_NUMBER_REQUEST });
        
        try {
            const response = await fetch(`${NORMA_API}/orders/${orderNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (data.success) {
                dispatch({ 
                    type: GET_ORDER_BY_NUMBER_SUCCESS, 
                    payload: data.orders[0] 
                });
            } else {
                dispatch({ type: GET_ORDER_BY_NUMBER_FAILED });
            }
        } catch (error) {
            console.error('Ошибка при получении заказа:', error);
            dispatch({ type: GET_ORDER_BY_NUMBER_FAILED });
        }
    };
}; 