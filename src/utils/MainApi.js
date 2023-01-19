import { mainApiUrl, moviesApiUrl, localUrl, imageStorageUrl } from './config';
import BadRequestError from '../Errors/bad-request-error';
import AuthError from '../Errors/authorization-error';
import ValueError from '../Errors/value-error';

function onResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return res;
    }
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
        .then((res) => {
            if (res.status === 409) {
                throw new BadRequestError('Пользователь с таким email уже существует.');
            } else if (res.status === 400) {
                throw new ValueError('При регистрации пользователя произошла ошибка.');
            }
            else {
                res.status = 200;
                return res;
            }
        })
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
        .then(res => {
            if (res.status === 401) {
                throw new AuthError('Вы ввели неправильный логин или пароль.');
            }
            return res.json()
        })
        .then(res => {
            res.status = 200;
            if (res.token) {
                localStorage.setItem('token', res.token);
            } else {
                throw new AuthError('При авторизации произошла ошибка. Переданный токен некорректен.');
            }
            return res;

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
        .then(res => {
            if (res.status === 401) {
                throw new AuthError('Вы ввели неправильный логин или пароль.');
            } else {
                return res.user;
            }
        })
}

export const logout = () => {
    return fetch(
        `${mainApiUrl}/signout`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            credentials: 'include',
        }
    )
}

// Получает информацию о пользователе
export const getUser = () => {
    return fetch(`${mainApiUrl}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        credentials: 'include',
    })
        .then(res => onResponse(res))
}

// Отправляет информацию о пользователе на сервер
export const updateUser = (name, email) => {
    return fetch(`${mainApiUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        credentials: 'include',
        body: JSON.stringify({ name, email })
    })
        .then(res => onResponse(res))
}

// Получает сохраненные карточки
export const getSavedMovies = () => {
    return fetch(`${mainApiUrl}/movies`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        credentials: 'include',
    })
        .then(res => onResponse(res))
}

// Отправляет карточку с фильмом
export const postMovie = ({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id }) => {
    // console.log(image.formats.thumbnail.url);
    const thumbnail = `${imageStorageUrl}${image.formats.thumbnail.url}`;
    const movieId = id;
    image = `${imageStorageUrl}${image.url}`;


    return fetch(`${mainApiUrl}/movies`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        credentials: 'include',
        body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            nameRU,
            nameEN,
            movieId,
        }),
    })
        .then(res => onResponse(res))
}


export const deleteMovie = (movieId) => {
    return fetch(`${mainApiUrl}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        credentials: 'include',
    })
        .then(res => onResponse(res))
}