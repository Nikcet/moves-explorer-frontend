import { moviesApiUrl } from './config';

class Api {
  constructor({ url, headers, credentials }) {
    this._url = url;
    this._headers = headers;
    this._credentials = credentials;
  }

  onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
  }

  // Получает все карточки
  getMovies() {
    return fetch(`${this._url}`, {
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(this.onResponse)

  }

  // Отправляет карточку с фильмом
  postMovie({ country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId }) {
    return fetch(`${this._url}/saved-movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
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
      .then(this.onResponse)
  }

  deleteMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(this.onResponse)
  }

  // Получает информацию о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: this._credentials,
    })
      .then(this.onResponse)
  }

  // Отправляет информацию о пользователе на сервер
  updateUser(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ name, email })
    })
      .then(this.onResponse)
  }

}

const moviesApi = new Api({
  url: moviesApiUrl,
  credentials: 'omit',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default moviesApi;