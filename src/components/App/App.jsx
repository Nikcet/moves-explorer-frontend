import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

  const [isLoggined, setIsLoggined] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: "", email: "" });


  React.useEffect(() => {
    signIn();
    // navigate('/');
  }, []);

  // Регистрация
  function handleRegister({ name, email, password }) {
    registration(name, email, password)
      .then(() => {
        console.log('Успешно зарегистрировался');
        navigate('/signin');
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
        console.log('Берет токен из localStorage');
        const token = localStorage.getItem('token');
        if (token !== "undefined" && token !== undefined) {
          console.log('Токен есть, начинает вход')
          signIn();
          navigate('/');
          console.log('Успешно авторизовался');
        } else {
          throw new Error('Не авторизовался ');
        }
      })
      .catch(err => { console.log(err.message) });
  }

  // Вход
  function signIn() {
    const token = localStorage.getItem('token')
    if (token) {
      login(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggined(true);
          console.log('Успешно залогинился');
        })
        .catch(err => { console.log('Что-то не так с токеном: ', err.message) })
    } else {
      console.log('Нет токена.');
    }

  }

  // Выход
  function signOut() {
    if (isLoggined) {
      navigate('/');
      logout()
        .then(() => {
          localStorage.clear();
          setIsLoggined(false);
          console.log('Успешно разлогинился');
        })
        .catch(err => { console.log('Не разлогинился: ', err.message) })
    } else {
      console.log('Уже разлогинен.');
    }
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
            {isLoggined && <Route path='/movies' element={
              <>
                <Header isLoggined={isLoggined} />
                <Movies />
                <Footer />
              </>
            } />}
            {isLoggined && <Route path='/saved-movies' element={
              <>
                <Header isLoggined={isLoggined} />
                <SavedMovies />
                <Footer />
              </>
            } />}
            {isLoggined && <Route path='/profile' element={
              <>
                <Header isLoggined={isLoggined} />
                <Profile signOut={signOut} />
              </>
            } />}
            <Route path='/signin' element={<Login onLogin={authorizationAndSignIn} />} />
            <Route path='/signup' element={<Register onRegister={handleRegister} />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
