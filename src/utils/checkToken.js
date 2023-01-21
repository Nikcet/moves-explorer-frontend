import { login } from './MainApi';

export default async function checkToken() {
  const token = localStorage.getItem('token');
  let isOk = false;
  if (token != null) {
    await login(token)
      .then((user) => {
        if (user) {
          isOk = true;
        }
      })
      .catch((err) => { console.log('Токен не прошел проверку: ', err) })
  }

  return isOk;
}
