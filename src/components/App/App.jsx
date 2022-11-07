import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { Route, Routes, Redirect, useNavigation } from 'react-router-dom';

function App() {

  const [isLoggined, setIsLoggined] = React.useState(true);

  return (
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
              <Header isLoggined={isLoggined} />
              <Movies />
              <Footer />
            </>
          } />
          <Route path='/saved-movies' element={
            <>
              <Header isLoggined={isLoggined} />
              <SavedMovies />
              <Footer />
            </>
          } />
          <Route path='/profile' element={
            <>
              <Header isLoggined={isLoggined} />
              <Profile />
            </>
          } />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
