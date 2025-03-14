import { TOrder } from '../../utils/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_AUTH_CONNECTION_START: 'WS_AUTH_CONNECTION_START' = 'WS_AUTH_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_AUTH_CONNECTION_SUCCESS: 'WS_AUTH_CONNECTION_SUCCESS' = 'WS_AUTH_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_AUTH_CONNECTION_ERROR: 'WS_AUTH_CONNECTION_ERROR' = 'WS_AUTH_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_AUTH_CONNECTION_CLOSED: 'WS_AUTH_CONNECTION_CLOSED' = 'WS_AUTH_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_AUTH_GET_ORDERS: 'WS_AUTH_GET_ORDERS' = 'WS_AUTH_GET_ORDERS';
export const WS_CONNECTION_DISCONNECT: 'WS_CONNECTION_DISCONNECT' = 'WS_CONNECTION_DISCONNECT';
export const WS_AUTH_CONNECTION_DISCONNECT: 'WS_AUTH_CONNECTION_DISCONNECT' = 'WS_AUTH_CONNECTION_DISCONNECT';


export interface IWsConnectionStartAction {
  type: typeof WS_CONNECTION_START;
}

export interface IWsAuthConnectionStartAction {
  type: typeof WS_AUTH_CONNECTION_START;
}

export interface IWsConnectionSuccessAction {
  type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsAuthConnectionSuccessAction {
  type: typeof WS_AUTH_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  type: typeof WS_CONNECTION_ERROR;
  payload: Event;
}

export interface IWsAuthConnectionErrorAction {
  type: typeof WS_AUTH_CONNECTION_ERROR;
  payload: Event;
}

export interface IWsConnectionClosedAction {
  type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsAuthConnectionClosedAction {
  type: typeof WS_AUTH_CONNECTION_CLOSED;
}

export interface IWsGetOrdersAction {
  type: typeof WS_GET_ORDERS;
  payload: {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  };
}

export interface IWsAuthGetOrdersAction {
  type: typeof WS_AUTH_GET_ORDERS;
  payload: {
    orders: Array<TOrder>;
  };
}

export interface IWsConnectionDisconnectAction {
  type: typeof WS_CONNECTION_DISCONNECT;
}

export interface IWsAuthConnectionDisconnectAction {
  type: typeof WS_AUTH_CONNECTION_DISCONNECT;
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsAuthConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsAuthConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsAuthConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsAuthConnectionClosedAction
  | IWsGetOrdersAction
  | IWsAuthGetOrdersAction
  | IWsConnectionDisconnectAction
  | IWsAuthConnectionDisconnectAction;

export const wsConnectionStart = (): IWsConnectionStartAction => ({
  type: WS_CONNECTION_START
});

export const wsAuthConnectionStart = (): IWsAuthConnectionStartAction => ({
  type: WS_AUTH_CONNECTION_START
});

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => ({
  type: WS_CONNECTION_SUCCESS
});

export const wsAuthConnectionSuccess = (): IWsAuthConnectionSuccessAction => ({
  type: WS_AUTH_CONNECTION_SUCCESS
});

export const wsConnectionError = (error: Event): IWsConnectionErrorAction => ({
  type: WS_CONNECTION_ERROR,
  payload: error
});

export const wsAuthConnectionError = (error: Event): IWsAuthConnectionErrorAction => ({
  type: WS_AUTH_CONNECTION_ERROR,
  payload: error
});

export const wsConnectionClosed = (): IWsConnectionClosedAction => ({
  type: WS_CONNECTION_CLOSED
});

export const wsAuthConnectionClosed = (): IWsAuthConnectionClosedAction => ({
  type: WS_AUTH_CONNECTION_CLOSED
});

export const wsGetOrders = (data: { orders: Array<TOrder>; total: number; totalToday: number }): IWsGetOrdersAction => ({
  type: WS_GET_ORDERS,
  payload: data
});

export const wsAuthGetOrders = (data: { orders: Array<TOrder> }): IWsAuthGetOrdersAction => ({
  type: WS_AUTH_GET_ORDERS,
  payload: data
});

export const wsConnectionDisconnect = (): IWsConnectionDisconnectAction => ({
  type: WS_CONNECTION_DISCONNECT
});

export const wsAuthConnectionDisconnect = (): IWsAuthConnectionDisconnectAction => ({
  type: WS_AUTH_CONNECTION_DISCONNECT
}); 