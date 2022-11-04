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
import { Route, Routes, Redirect, useHistory } from 'react-router-dom';

function App() {

  const [isLoggined, setIsLoggined] = React.useState(true);

  return (
    <div className="App">
      <div className="page">
        <Header isLoggined={isLoggined} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
