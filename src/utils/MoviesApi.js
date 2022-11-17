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

  // // Получает информацию о пользователе
  // getUserInfo() {
  //     return fetch(`${this._url}/users/me`, {
  //         headers: this._headers,
  //         credentials: 'include',
  //     })
  //         .then(this.onResponse)
  // }

  // // Отправляет информацию о пользователе на сервер
  // sendProfileDatasToServer(name, about) {
  //     return fetch(`${this._url}/users/me`, {
  //         method: 'PATCH',
  //         headers: this._headers,
  //         credentials: 'include',
  //         body: JSON.stringify({
  //             name,
  //             about,
  //         })
  //     })
  //         .then(this.onResponse)
  // }

  // // Отправляет аватар пользователя на сервер
  // sendAvatarToServer(avatar) {
  //     return fetch(`${this._url}/users/me/avatar`, {
  //         method: 'PATCH',
  //         headers: this._headers,
  //         credentials: 'include',
  //         body: JSON.stringify({ avatar }),
  //     })
  //         .then(this.onResponse)
  // }

  // // Отправляет карточку на сервер
  // postCard({ name, link }) {
  //     return fetch(`${this._url}/cards`, {
  //         method: 'POST',
  //         headers: this._headers,
  //         credentials: 'include',
  //         body: JSON.stringify({
  //             name,
  //             link,
  //         })
  //     })
  //         .then(this.onResponse)
  // }

  // // Удаляет карточку с сервера
  // deleteCard(cardId) {
  //     return fetch(`${this._url}/cards/${cardId}`, {
  //         method: 'DELETE',
  //         headers: this._headers,
  //         credentials: 'include',
  //     })
  //         .then(this.onResponse)
  // }

  // // Ставит / убирает лайки
  // changeLikeCardStatus(cardId, isLiked) {
  //     return fetch(`${this._url}/cards/${cardId}/likes`, {
  //         method: `${isLiked ? 'PUT' : 'DELETE'}`,
  //         headers: this._headers,
  //         credentials: 'include',
  //     })
  //         .then(this.onResponse)
  // }
}

const moviesApi = new Api({
  url: moviesApiUrl,
  credentials: 'omit',
  headers: {
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Credentials": 'X-Custom-Information',
  },
})

export default moviesApi;