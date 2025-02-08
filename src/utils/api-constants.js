export const NORMA_API = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_ENDPOINT = '/ingredients';
export const ORDER_ENDPOINT = '/orders';
export const API_LOGIN = '/auth/login' // эндпоинт для авторизации.
export const API_REGISTER = '/auth/register' // эндпоинт для регистрации пользователя.
export const API_LOGOUT = '/auth/logout' // эндпоинт для выхода из системы.
export const API_USER_PROFILE = '/auth/user' // эндпоинт получения данных о пользователе. если PATCH запрост - то меняет данные пользователя
const API_RESET_PASSWORD = '/password-reset'; // эндпоинт запроса на сброс пароля
const API_RESET_PASSWORD_RESET = '/password-reset/reset' // эндпоинт самого сброса пароля



// const checkResponse = (res) => {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
// };

// export const request = async (endpoint, options) => {
//     const url = NORMA_API + endpoint;
//     return fetch(url, options).then(checkResponse);
// }; 

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };
  
export const refreshToken = async () => {
const res = await fetch(`${NORMA_API}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    const refreshData = await checkReponse(res);
    if (!refreshData.success) {
        return Promise.reject(refreshData);
    }
    localStorage.setItem("refreshToken", refreshData.refreshToken);
    localStorage.setItem("accessToken", refreshData.accessToken);
    return refreshData;
};

export const fetchWithRefresh = async (endpoint, options) => {
try {
    const url = NORMA_API + endpoint;
    const res = await fetch(url, options);
    return await checkReponse(res);
} catch (err) {
    if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await checkReponse(res);
    } else {
        return Promise.reject(err);
    }
}
};

// export const getUser = async () => {
//     try {
//         if (localStorage.getItem('accessToken')) {
//             return fetchWithRefresh(API_USER_PROFILE, {
//                 method: "GET",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': localStorage.getItem('accessToken')
//                 }
//             }).then((data) => data.json())
//         } else {
//             return false;
//         }
//     } catch (err) {
//         localStorage.removeItem("accessToken")
//         localStorage.removeItem("refreshToken")
//         throw err;
//     }
// }

export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${NORMA_API}${API_RESET_PASSWORD}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const data = await response.json();
        if (data.success) {
            return data
        }
        
    } catch (error) {
        dispatch({ 
            type: LOGIN_FAILED,
            error: error.message 
        });
        return false;
    };
};


export const resetPassword = async (email, token) => {
    try {
        const response = await fetch(`${NORMA_API}${API_RESET_PASSWORD_RESET}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, token })
        });
        const data = await response.json();
        if (data.success) {
            return data
        }
        
    } catch (error) {
        dispatch({ 
            type: LOGIN_FAILED,
            error: error.message 
        });
        return false;
    };
};

