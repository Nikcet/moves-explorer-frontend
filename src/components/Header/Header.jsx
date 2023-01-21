import React from 'react';
import Navigation from '../Navigation/Navigation';
// import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <Navigation isLoggined={props.isLoggined}/>

      {!props.isLoggined && <div className="header__buttons">
        <Link to='/signup' className='header__button header__button-reg'>Регистрация</Link>
        <Link to='/signin' className='header__button header__button-login'>Войти</Link>
      </div>}

    </header>
  );
}

export default Header;
