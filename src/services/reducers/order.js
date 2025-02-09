import {
    ORDER_REQUEST,
    ORDER_SUCCESS,
    ORDER_FAILED
} from '../actions/order';

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
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
                orderRequest: false,
                order: action.order,
            };
        case ORDER_FAILED:
            return {
                ...state,
                order: null,
                orderRequest: false,
                orderFailed: true,
            };
        default:
            return state;
    }
}; 