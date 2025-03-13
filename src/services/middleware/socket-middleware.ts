import { Middleware, MiddlewareAPI } from 'redux';
import {
    WS_CONNECTION_START,
    WS_AUTH_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_AUTH_GET_ORDERS,
    WS_CONNECTION_DISCONNECT,
    WS_AUTH_CONNECTION_DISCONNECT,    
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetOrders,
    wsAuthConnectionSuccess,
    wsAuthConnectionError,
    wsAuthConnectionClosed,
    wsAuthGetOrders,
    wsAuthConnectionStart
} from '../actions/ws-actions';
import { refreshToken, WS_URL } from '../../utils/api-constants';
import { RootState } from '../root-r';
import { AppDispatch, TApplicationActions } from '../types/data';


export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let authSocket: WebSocket | null = null;
        let isAuthConnected = false;
    
        return next => (action: TApplicationActions) => {
            const { dispatch } = store;

            if (action.type === WS_CONNECTION_START) {
                socket = new WebSocket(`${WS_URL}/all`);

                socket.onopen = () => {
                    dispatch(wsConnectionSuccess());
                };

                socket.onerror = (event) => {
                    dispatch(wsConnectionError(event));
                };

                socket.onmessage = (event) => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    if (parsedData.success) {
                        dispatch(wsGetOrders(parsedData));
                    }
                };

                socket.onclose = () => {
                    dispatch(wsConnectionClosed());
                };
            }

            if (action.type === WS_CONNECTION_DISCONNECT && socket) {
                socket.close();
                socket = null;
            }

            if (action.type === WS_AUTH_CONNECTION_START) {
                const accessToken = localStorage.getItem('accessToken')?.replace('Bearer ', '');
                if (accessToken) {
                    authSocket = new WebSocket(`${WS_URL}?token=${accessToken}`);

                    authSocket.onopen = () => {
                        isAuthConnected = true;
                        dispatch(wsAuthConnectionSuccess());
                    };

                    authSocket.onerror = (event) => {
                        dispatch(wsAuthConnectionError(event));
                    };

                    authSocket.onmessage = (event) => {
                        const { data } = event;
                        const parsedData = JSON.parse(data);
                        
                        if (parsedData.success) {
                            dispatch(wsAuthGetOrders(parsedData));
                        } else if (
                            parsedData.message === 'Invalid or missing token' && 
                            isAuthConnected
                        ) {
                            isAuthConnected = false;
                            authSocket?.close();
                            
                            refreshToken().then(success => {
                                if (success) {
                                    dispatch(wsAuthConnectionStart());
                                } else {
                                    console.error('Не удалось обновить токен');
                                }
                            }).catch(err => {
                                console.error('Ошибка при обновлении токена:', err);
                            });
                        }
                    };

                    authSocket.onclose = () => {
                        isAuthConnected = false;
                        dispatch(wsAuthConnectionClosed());
                    };
                }
            }

            if (action.type === WS_AUTH_CONNECTION_DISCONNECT && authSocket) {
                authSocket.close();
                authSocket = null;
                isAuthConnected = false;
            }

            next(action);
        };
    }) as Middleware
}; 