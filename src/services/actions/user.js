import { NORMA_API, API_REGISTER, API_LOGIN, API_USER_PROFILE, fetchWithRefresh, refreshToken } from "../../utils/api-constants";

export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';
export const SET_USER = 'SET_USER';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const EDIT_PROFILE_REQUEST = 'EDIT_PROFILE_REQUEST';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILED = 'EDIT_PROFILE_FAILED';

export const userSlice = (ingredients) => {
    return async (dispatch) => {
        dispatch({ type: ORDER_REQUEST });
        try {
            const data = await fetchWithRefresh(ORDER_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingredients }),
            });
            if (data.success) {
                dispatch({ type: ORDER_SUCCESS, order: data });
            } else {
                dispatch({ type: ORDER_FAILED });
            }
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            dispatch({ type: ORDER_FAILED });
        }
    };
};

export const registerUser = (email, password, name) => {
    return async (dispatch) => {
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
            dispatch({ 
                type: REGISTER_FAILED,
                error: error.message 
            });
            return false;
        }
    };
};

export const loginUser = (email, password) => {
    return async (dispatch) => {
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
            dispatch({ 
                type: LOGIN_FAILED,
                error: error.message 
            });
            return false;
        }
    };
};

export const checkUserAuth = () => {
    return async (dispatch) => {

        if (!localStorage.getItem('refreshToken')) {
            console.warn('Отсутствует refreshToken, выход');
            dispatch({ type: SET_IS_AUTH_CHECKED, isAuthChecked: false });
            return;
        }

        try {
            const data = await fetchWithRefresh(API_USER_PROFILE, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('accessToken')
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




export const editUserInfo = (updatedFields) => {
    return async (dispatch) => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) return;

        try {
            dispatch({ type: EDIT_PROFILE_REQUEST });

            const data = await fetchWithRefresh(API_USER_PROFILE, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
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
