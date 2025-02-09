export const NORMA_API = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_ENDPOINT = '/ingredients';
export const ORDER_ENDPOINT = '/orders';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const request = async (endpoint, options) => {
    const url = NORMA_API + endpoint;
    return fetch(url, options).then(checkResponse);
}; 