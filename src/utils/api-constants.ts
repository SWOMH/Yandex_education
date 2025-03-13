export const NORMA_API = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_ENDPOINT = '/ingredients';
export const ORDER_ENDPOINT = '/orders';
export const API_LOGIN = '/auth/login' // эндпоинт для авторизации.
export const API_REGISTER = '/auth/register' // эндпоинт для регистрации пользователя.
export const API_LOGOUT = '/auth/logout' // эндпоинт для выхода из системы.
export const API_USER_PROFILE = '/auth/user' // эндпоинт получения данных о пользователе. если PATCH запрост - то меняет данные пользователя
const API_RESET_PASSWORD = '/password-reset'; // эндпоинт запроса на сброс пароля
const API_RESET_PASSWORD_RESET = '/password-reset/reset' // эндпоинт самого сброса пароля


export const WS_URL = 'wss://norma.nomoreparties.space/orders'; // 50 последних заказов
export const API_ORDER = '/orders/{номер заказа}' // GET запрос определенного заказа

interface IApiResponse<T> {
    success: boolean;
    message?: string;
    [key: string]: any;
    data?: T;
}

interface IRefreshTokenResponse {
    success: boolean;
    refreshToken: string;
    accessToken: string;
}

interface IRequestOptions extends RequestInit {
    headers: {
        "Content-Type": string;
        authorization?: string;
    };
}


const checkReponse = async <T>(res: Response): Promise<IApiResponse<T>> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };
  
export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
    const res = await fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });

    const refreshData = await checkReponse<IRefreshTokenResponse>(res);

    if (!refreshData.success || !refreshData.data) {
        return Promise.reject(refreshData);
    }

    localStorage.setItem("refreshToken", refreshData.data.refreshToken);
    localStorage.setItem("accessToken", refreshData.data.accessToken);

    return refreshData.data;
};


export const fetchWithRefresh = async <T>(endpoint: string, options: IRequestOptions): Promise<IApiResponse<T>> => {
    const url = NORMA_API + endpoint;
    try {    
        const res = await fetch(url, options);
        return await checkReponse<T>(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
}
};

export const forgotPassword = async (email: string): Promise<boolean> => {
    try {
        const response = await fetch(`${NORMA_API}${API_RESET_PASSWORD}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        return data.success;
        
    } catch (error) {// @ts-ignore
        dispatch({ // @ts-ignore
            type: LOGIN_FAILED, // @ts-ignore
            error: error.message 
        });
        return false;
    };
};


export const resetPassword = async (password: string, token: string): Promise<boolean> => {
    try {
        const response = await fetch(`${NORMA_API}${API_RESET_PASSWORD_RESET}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, token })
        });
        const data = await response.json();
        return data.success          
        
    } catch (error) {// @ts-ignore
        dispatch({  // @ts-ignore
            type: LOGIN_FAILED, // @ts-ignore
            error: error.message 
        });
        return false;
    };
};

export const logout = async () => {
    try {
        const token = localStorage.getItem('refreshToken');
        const response = await fetch(`${NORMA_API}${API_LOGOUT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Ошибка при выходе');
        }
        return data.success;
    } catch (error) {
        console.error('Ошибка выхода:', error);
        throw error; 
    }
};
