import { NORMA_API, API_REGISTER, API_LOGIN, API_USER_PROFILE, fetchWithRefresh } from "../../utils/api-constants";

export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';
export const SET_USER = 'SET_USER';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

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
        if (localStorage.getItem('accessToken')) {
            try {
                const data = await fetchWithRefresh(API_USER_PROFILE, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('accessToken')
                    }
                });
                console.log("Перед условием")
                if (data.success) {
                    console.log("Зашло в условие. Запрос успешен")
                    dispatch({
                        type: SET_USER,
                        user: data.user
                    });
                    dispatch({ 
                        type: SET_IS_AUTH_CHECKED,
                        isAuthChecked: true
                    });
                    return
                } else {
                    console.log("Зашло в блок else сейчас удалит токены")
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    dispatch({
                        type: SET_USER,
                        user: null
                    });
                }
            } catch (error) {
                console.log("Зашло в блок catch чет ебнулось вот ошибка " + error)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                dispatch({
                    type: SET_USER,
                    user: null
                });
            }
        }
        
    };
}; 


// Пользователь заходит. Проверяется в функции есть ли токен. если нет, то флаг аунтефиката возводится в false. если есть, то идет запрос пользователя
// и сохраняется в стор, а флаг становится true
// Остальное работает от такой же логики