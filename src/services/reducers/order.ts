import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILED,
    GET_ORDER_BY_NUMBER_REQUEST,
    GET_ORDER_BY_NUMBER_SUCCESS,
    GET_ORDER_BY_NUMBER_FAILED,
    TOrderActions
} from '../actions/order';
import { TOrder } from '../../utils/types';

export type TOrderState = {
    orderRequest: boolean;
    orderFailed: boolean;
    order: number | null;
    currentOrder: TOrder | null;
    currentOrderRequest: boolean;
    currentOrderFailed: boolean;
};

export const initialState: TOrderState = {
    orderRequest: false,
    orderFailed: false,
    order: null,
    currentOrder: null,
    currentOrderRequest: false,
    currentOrderFailed: false
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            };
        case ORDER_SUCCESS:
            return {
                ...state,
                order: action.order,
                orderRequest: false
            };
        case ORDER_FAILED:
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        case GET_ORDER_BY_NUMBER_REQUEST:
            return {
                ...state,
                currentOrderRequest: true,
                currentOrderFailed: false,
            };
        case GET_ORDER_BY_NUMBER_SUCCESS:
            return {
                ...state,
                currentOrder: action.payload,
                currentOrderRequest: false
            };
        case GET_ORDER_BY_NUMBER_FAILED:
            return {
                ...state,
                currentOrderFailed: true,
                currentOrderRequest: false
            };
        default:
            return state;
    }
}; 