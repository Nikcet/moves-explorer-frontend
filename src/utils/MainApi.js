import { mainApiUrl } from './config';

function onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}

export const registration = (name, email, password) => {
    return fetch(
        `${mainApiUrl}/signup`,
        {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        }
    )
        .then(res => onResponse(res))
}

export const authorization = (email, password) => {
    return fetch(
        `${mainApiUrl}/signin`,
        {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        }
    )
        .then(res => onResponse(res))
        .then(data => {
            localStorage.setItem('token', data.token);
        })
}

export const login = (jwtToken) => {
    return fetch(
        `${mainApiUrl}/users/me`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${jwtToken}`,
                "Access-Control-Allow-Credentials": true
            }
        }
    )
        .then(res => onResponse(res))
}
