import { NORMA_API, API_REGISTER, API_LOGIN, API_USER_PROFILE, fetchWithRefresh, refreshToken, ORDER_ENDPOINT } from "../../utils/api-constants";
import { AppDispatch, AppThunk } from "../types/data";
import { IRegisterForm } from '../../utils/types';

export const SET_IS_AUTH_CHECKED: 'SET_IS_AUTH_CHECKED' = 'SET_IS_AUTH_CHECKED';
export const SET_USER: 'SET_USER' = 'SET_USER';
export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const EDIT_PROFILE_REQUEST: 'EDIT_PROFILE_REQUEST' = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS: 'EDIT_PROFILE_SUCCESS' = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILED: 'EDIT_PROFILE_FAILED' = 'EDIT_PROFILE_FAILED';

export interface IUser {
    email: string;
    name: string;
}

export interface IAuthResponse {
    success: boolean;
    user: IUser;
    accessToken: string;
    refreshToken: string;
}

export interface ISetIsAuthCheckedAction {
    type: typeof SET_IS_AUTH_CHECKED;
    isAuthChecked: boolean;
}

export interface ISetUserAction {
    type: typeof SET_USER;
    user: IUser | null;
}

export interface IRegisterRequestAction {
    type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    user: IUser;
}

export interface IRegisterFailedAction {
    type: typeof REGISTER_FAILED;
    error: string;
}

export interface ILoginRequestAction {
    type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    user: IUser;
}

export interface ILoginFailedAction {
    type: typeof LOGIN_FAILED;    
    error: string;
}

export interface IEditProfileRequestAction {
    type: typeof EDIT_PROFILE_REQUEST;
}

export interface IEditProfileSuccessAction {
    type: typeof EDIT_PROFILE_SUCCESS;
    user: IUser;
}

export interface IEditProfileFailedAction {
    type: typeof EDIT_PROFILE_FAILED;
    error: string;
}

export type TUserActions =
    | ISetIsAuthCheckedAction
    | ISetUserAction
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | IEditProfileRequestAction
    | IEditProfileSuccessAction
    | IEditProfileFailedAction;


export const registerUser: AppThunk<Promise<boolean>> = (email: string, password: string, name: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: REGISTER_REQUEST });
        try {
            const response = await fetch(`${NORMA_API}${API_REGISTER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, name })
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({ 
                    type: REGISTER_SUCCESS,
                    user: data.user
                });
                return true;
            } else {
                dispatch({ 
                    type: REGISTER_FAILED,
                    error: data.message 
                });
                return false;
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ 
                    type: REGISTER_FAILED,
                    error: error.message 
                });
            } else {
                dispatch({ 
                    type: REGISTER_FAILED,
                    error: 'Произошла неизвестная ошибка' 
                });
            }
            return false;
        }
    };
};

export const loginUser: AppThunk<Promise<boolean>> = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: LOGIN_REQUEST });
        try {
            const response = await fetch(`${NORMA_API}${API_LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({ 
                    type: LOGIN_SUCCESS,
                    user: data.user
                });
                return true;
            } else {
                dispatch({ 
                    type: LOGIN_FAILED,
                    error: data.message 
                });
                return false;
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch({ 
                    type: LOGIN_FAILED,
                    error: error.message 
                });
            } else {
                dispatch({ 
                    type: LOGIN_FAILED,
                    error: 'Произошла неизвестная ошибка' 
                });
            }
            return false;
        }
    };
};

export const checkUserAuth: AppThunk = () => {
    return async (dispatch: AppDispatch) => {

        if (!localStorage.getItem('refreshToken')) {
            console.warn('Отсутствует refreshToken, выход');
            dispatch({ type: SET_IS_AUTH_CHECKED, isAuthChecked: false });
            return;
        }

        try {
            const accessToken = localStorage.getItem('accessToken');
            const data = await fetchWithRefresh(API_USER_PROFILE, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken && { authorization: accessToken })
                }
            });
            if (data.success) {
                dispatch({ type: SET_USER, user: data.user });
                dispatch({ type: SET_IS_AUTH_CHECKED, isAuthChecked: true });
            } else {
                throw new Error('Ошибка авторизации');
            }
        } catch (error) {
            try {
                await refreshToken();
                dispatch(checkUserAuth());
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({ type: SET_USER, user: null });
                dispatch({ type: SET_IS_AUTH_CHECKED, isAuthChecked: true });
            }
        }
    };
};




export const editUserInfo: AppThunk = (updatedFields: Partial<IRegisterForm>) => {
    return async (dispatch: AppDispatch) => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) return;

        try {
            dispatch({ type: EDIT_PROFILE_REQUEST });

            const data = await fetchWithRefresh(API_USER_PROFILE, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: accessToken
                },
                body: JSON.stringify(updatedFields)
            });

            if (data.success) {
                dispatch({
                    type: EDIT_PROFILE_SUCCESS,
                    user: data.user
                });

                dispatch({
                    type: SET_IS_AUTH_CHECKED,
                    isAuthChecked: true
                });

                return;
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({
                    type: SET_USER,
                    user: null
                });
            }
        } catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({
                type: SET_USER,
                user: null
            });
        }
    };
};
