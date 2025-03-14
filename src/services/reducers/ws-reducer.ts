import { TOrder } from '../../utils/types';
import {
    WS_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_AUTH_GET_ORDERS,
    TWsActions
} from '../actions/ws-actions';


  export type TWsState = {
    wsConnected: boolean;
    wsAuthConnected: boolean;
    orders: Array<TOrder>;
    userOrders: Array<TOrder>;
    total: number;
    totalToday: number;
    error?: Event;
    authError?: Event;
  };


const initialState: TWsState = {
    wsConnected: false,
    wsAuthConnected: false,
    orders: [],
    userOrders: [],
    total: 0,
    totalToday: 0
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                error: undefined
            };
        case WS_AUTH_CONNECTION_SUCCESS:
            return {
                ...state,
                wsAuthConnected: true,
                authError: undefined
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload
            };
        case WS_AUTH_CONNECTION_ERROR:
            return {
                ...state,
                wsAuthConnected: false,
                authError: action.payload
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                error: undefined
            };
        case WS_AUTH_CONNECTION_CLOSED:
            return {
                ...state,
                wsAuthConnected: false,
                authError: undefined
            };
        case WS_GET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        case WS_AUTH_GET_ORDERS:
            return {
                ...state,
                userOrders: action.payload.orders
            };
        default:
            return state;
    }
}; 