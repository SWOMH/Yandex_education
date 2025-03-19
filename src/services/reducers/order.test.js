import { orderReducer, initialState } from './order';
import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILED,
  GET_ORDER_BY_NUMBER_REQUEST,
  GET_ORDER_BY_NUMBER_SUCCESS,
  GET_ORDER_BY_NUMBER_FAILED,
} from '../actions/order';

describe('orderReducer', () => {
  const mockOrderNumber = 12345;
  const mockOrder = {
    _id: '1',
    number: 12345,
    name: 'Test Order',
    status: 'done',
    ingredients: ['ingredient1', 'ingredient2'],
    createdAt: '2023-10-01T00:00:00.000Z',
    updatedAt: '2023-10-01T00:00:00.000Z',
  };

  it('should return the initial state', () => {    
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ORDER_REQUEST', () => {
    const action = {
      type: ORDER_REQUEST,
    };

    const expectedState = {
      ...initialState,
      orderRequest: true,
      orderFailed: false,      
    };

    expect(orderReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle ORDER_SUCCESS', () => {
    const action = {
      type: ORDER_SUCCESS,
      order: mockOrderNumber,
    };

    const expectedState = {
      ...initialState,
      orderRequest: false,
      orderFailed: false,
      order: mockOrderNumber,      
    };

    expect(orderReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle ORDER_FAILED', () => {
    const action = {
      type: ORDER_FAILED,
    };

    const expectedState = {
      ...initialState,
      orderRequest: false,
      orderFailed: true,    
    };

    expect(orderReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_BY_NUMBER_REQUEST', () => {
    const action = {
      type: GET_ORDER_BY_NUMBER_REQUEST,
    };

    const expectedState = {
      ...initialState,      
      currentOrderRequest: true,
      currentOrderFailed: false,
    };

    expect(orderReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_BY_NUMBER_SUCCESS', () => {
    const action = {
      type: GET_ORDER_BY_NUMBER_SUCCESS,
      payload: mockOrder,
    };

    const expectedState = {
      ...initialState,      
      currentOrder: mockOrder,
      currentOrderRequest: false,
      currentOrderFailed: false,
    };

    expect(orderReducer(undefined, action)).toEqual(expectedState);
  });

  it('should handle GET_ORDER_BY_NUMBER_FAILED', () => {
    const action = {
      type: GET_ORDER_BY_NUMBER_FAILED,
    };

    const expectedState = {
      ...initialState,      
      currentOrderRequest: false,
      currentOrderFailed: true,
    };

    expect(orderReducer(undefined, action)).toEqual(expectedState);
  });
});