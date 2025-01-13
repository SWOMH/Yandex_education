export const NORMA_API = 'https://norma.nomoreparties.space/api';
export const INGREDIENTS_ENDPOINT = `${NORMA_API}/ingredients`;
export const ORDER_ENDPOINT = `${NORMA_API}/orders`;

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}; 