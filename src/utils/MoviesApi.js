import { moviesApiUrl } from './config';
import { localUrl } from './config';

class Api {
  constructor({ url, headers, credentials }) {
    this._url = url;
    this._headers = headers;
    this._credentials = credentials;
  }

  onResponse(res) {
    return res.ok ? res.json() : res;
  }

  // Получает все карточки
  getMovies() {
    return fetch(`${this._url}`, {
      headers: this._headers,
      credentials: this._credentials,
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