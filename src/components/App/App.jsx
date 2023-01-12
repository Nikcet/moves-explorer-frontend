import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { registration, authorization, login, logout } from '../../utils/MainApi';


function App() {

  const navigate = useNavigate();

  const [isLoggined, setIsLoggined] = React.useState(JSON.parse(localStorage.getItem('isLoggined')) || false);
  const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem('currentUser')) || { name: '', email: '' });


  // Регистрация
  function handleRegister({ name, email, password }) {
    registration(name, email, password)
      .then((data) => {
        if (data) {
          console.log('Успешно зарегистрировался');
          authorizationAndSignIn({ email: email, password: password });
        } else {
          throw new Error('Не удалось зарегистрироваться.');
        }
      })
      .catch(err => {
        throw new Error('Не зарегистрировался ', err.message);
      })
  }

  // Авторизация
  function authorizationAndSignIn({ email, password }) {
    console.log('Начало авторизации');
    authorization(email, password)
      .then(() => {
        console.log('Авторизовался. Начинает логиниться.')
        signIn();
      })
      .catch(err => { console.log('Не авторизовался', err.message) });
  }

  // Вход
  function signIn() {
    console.log('Берет токен из localStorage');
    const token = localStorage.getItem('token');
    if (token) {
      login(token)
        .then((user) => {
          setIsLoggined(true);
          localStorage.setItem('isLoggined', JSON.stringify(true));
          updateCurrentUser(user);
          console.log('Успешно залогинился');
        })
        .then(() => navigate('/movies'))
        .catch(err => {
          console.log('Что-то не так с токеном: ', err.message);
          setIsLoggined(false);
          localStorage.setItem('isLoggined', JSON.stringify(false));
        })
    } else {
      console.log('Нет токена.');
    }
  }


  // Выход
  function signOut() {
    if (isLoggined) {
      logout()
        .then(() => {
          localStorage.clear();
          setIsLoggined(false);
          localStorage.setItem('isLoggined', JSON.stringify(false));
          updateCurrentUser({ name: '', email: '' });
          console.log('Успешно разлогинился');
          navigate('/');
        })
        .catch(err => { console.log('Не разлогинился: ', err.message) })
    } else {
      console.log('Уже разлогинен.');
    }
  }

  // Обновляет состояние текущего пользователя
  function updateCurrentUser(user) {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Routes>
            <Route path='/' element={
              <>
                <Header isLoggined={isLoggined} />
                <Main />
                <Footer />
              </>
            } />
            {<Route path='/movies' element={
              isLoggined ?
                <>
                  <Header isLoggined={isLoggined} />
                  <Movies />
                  <Footer />
                </> : <Navigate to='/' />
            } />}
            {<Route path='/saved-movies' element={
              isLoggined ?
                <>
                  <Header isLoggined={isLoggined} />
                  <SavedMovies />
                  <Footer />
                </> : <Navigate to='/' />
            } />}
            {<Route path='/profile' element={
              isLoggined ?
                <>
                  <Header isLoggined={isLoggined} />
                  <Profile signOut={signOut} updateCurrentUser={updateCurrentUser} />
                </> : <Navigate to='/' />
            } />}
            {<Route path='/signin' element={!isLoggined ? <Login onLogin={authorizationAndSignIn} /> : <Navigate to='/' />} />}
            {<Route path='/signup' element={!isLoggined ? <Register onRegister={handleRegister} /> : <Navigate to='/' />} />}
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
