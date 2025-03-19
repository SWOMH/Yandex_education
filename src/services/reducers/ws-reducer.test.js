import { wsReducer, initialState } from './ws-reducer'; // Импортируем initialState
import {
  WS_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_AUTH_GET_ORDERS,
} from '../actions/ws-actions';

describe('wsReducer', () => {
  const mockOrders = [
    {
      _id: 'asfds',
      number: 0,
      name: 'Test Order 1',
      status: 'done',
      ingredients: ['60d3463f7034a000269f45e7', '60d3463f7034a000269f45e9'],
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
    {
      _id: 'hgfjk',
      number: 1,
      name: 'Test Order 2',
      status: 'pending',
      ingredients: ['60d3463f7034a000269f45ea', '60d3463f7034a000269f45e8'],
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },
  ];

  const mockEvent = new Event('error');

  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: WS_CONNECTION_SUCCESS,
    };

    const expectedState = {
      ...initialState,
      wsConnected: true,
      error: undefined,
    };

    expect(wsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_AUTH_CONNECTION_SUCCESS', () => {
    const action = {
      type: WS_AUTH_CONNECTION_SUCCESS,
    };

    const expectedState = {
      ...initialState,
      wsAuthConnected: true,
      authError: undefined,
    };

    expect(wsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    const action = {
      type: WS_CONNECTION_ERROR,
      payload: mockEvent,
    };

    const expectedState = {
      ...initialState,
      wsConnected: false,
      error: mockEvent,
    };

    expect(wsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_AUTH_CONNECTION_ERROR', () => {
    const action = {
      type: WS_AUTH_CONNECTION_ERROR,
      payload: mockEvent,
    };

    const expectedState = {
      ...initialState,
      wsAuthConnected: false,
      authError: mockEvent,
    };

    expect(wsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    const action = {
      type: WS_CONNECTION_CLOSED,
    };

    const expectedState = {
      ...initialState,
      wsConnected: false,
      error: undefined,
    };

    expect(wsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_AUTH_CONNECTION_CLOSED', () => {
    const action = {
      type: WS_AUTH_CONNECTION_CLOSED,
    };

    const expectedState = {
      ...initialState,
      wsAuthConnected: false,
      authError: undefined,
    };

    expect(wsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_GET_ORDERS', () => {
    const action = {
      type: WS_GET_ORDERS,
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 10,
      },
    };

    const expectedState = {
      ...initialState,
      orders: mockOrders,
      total: 100,
      totalToday: 10,
    };

    expect(wsReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle WS_AUTH_GET_ORDERS', () => {
    const action = {
      type: WS_AUTH_GET_ORDERS,
      payload: {
        orders: mockOrders,
      },
    };

    const expectedState = {
      ...initialState,
      userOrders: mockOrders,
    };

    expect(wsReducer(undefined, action)).toEqual(expectedState);
  });
});