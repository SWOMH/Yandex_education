import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    SET_USER,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SET_IS_AUTH_CHECKED,
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILED
} from '../actions/user';

const initialState = {
    user: null,
    isAuthChecked: false,
    registerRequest: false,
    registerFailed: false,
    error: null,
    loginRequest: false,
    loginFailed: false,
    editProfileRequest: false,
    editProfileFailed: false
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
                isAuthChecked: false,
                registerFailed: false,
                error: null
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                registerRequest: false,
                isAuthChecked: true
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                registerFailed: true,
                isAuthChecked: false,
                registerRequest: false,
                error: action.error
            };
        }
        case SET_USER: {
            return {
                ...state,
                user: action.user,
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
                error: null
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.user,
                loginRequest: false,
                isAuthChecked: true
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginFailed: true,
                loginRequest: false,
                error: action.error,
                isAuthChecked: false
            };
        }
        case SET_IS_AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: action.isAuthChecked
            };
        }
        case EDIT_PROFILE_REQUEST: {
            return {
                ...state,
                editProfileRequest: true,                
                editProfileFailed: false,
                error: null
            };
        }
        case EDIT_PROFILE_SUCCESS: {
            return {
                ...state,
                user: action.user,
                editProfileRequest: false,
                isAuthChecked: true
            };
        }
        case EDIT_PROFILE_FAILED: {
            return {
                ...state,
                editProfileFailed: true,
                isAuthChecked: false,
                editProfileRequest: false,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
}; 