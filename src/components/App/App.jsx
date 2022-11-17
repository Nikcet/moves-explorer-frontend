import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
import { registration, authorization, login } from '../../utils/MainApi';
import Navigation from '../Navigation/Navigation';


function App() {

  const navigate = useNavigate();

  const [isLoggined, setIsLoggined] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});


  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggined(true);
      navigate('/')

    }
    // signIn();
  }, [isLoggined]);

  // Регистрация
  function handleRegister({ name, email, password }) {
    console.log('Пришло из формы: ', name, email, password);
    registration(name, email, password)
      .then(() => {
        console.log('Успешно зарегался');
        navigate('/signin');
      })
      .catch(err => {
        console.log('Не зарегистрировался ', err.message);
      })
  }

  // Авторизация
  function authorizationAndSignIn({ email, password }) {
    console.log('Начало авторизации');
    authorization(email, password)
      .then(() => {
        console.log('Берет токен из localStorage');
        if (localStorage.getItem('token')) {
          console.log('Токен есть, начинает вход')
          signIn();
          navigate('/');
        } else {
          throw new Error('Не авторизовался ');
        }
      })
      .catch(err => { console.log('Не авторизовался ', err.message) });
  }

  // Вход
  function signIn() {
    const token = localStorage.getItem('token');
    if (token) {
      login(token).then(user => {
        setCurrentUser(user);
        setIsLoggined(true);
      })
        .catch(err => { console.log('Что-то не так с токеном: ', err.message) })
    } else {
      setIsLoggined(false);
    }
  }


  function signOut() {
    if (isLoggined) {
      localStorage.clear();
      setIsLoggined(false);
      navigate('/');
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
            <Route path='/movies' element={
              <>
                {!isLoggined && <Navigate to='/signin' />}
                <Header isLoggined={isLoggined} />
                <Movies />
                <Footer />
              </>
            } />
            <Route path='/saved-movies' element={
              <>
                {!isLoggined && <Navigate to='/signin' />}
                <Header isLoggined={isLoggined} />
                <SavedMovies />
                <Footer />
              </>
            } />
            <Route path='/profile' element={
              <>
                {!isLoggined && <Navigate to='/signin' />}
                <Header isLoggined={isLoggined} />
                <Profile signOut={signOut} />
              </>
            } />
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
