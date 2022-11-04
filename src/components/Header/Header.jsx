import React from 'react';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.png';

function Header(props) {
  console.log(props.isLoggined);
  return (
    <header className="header">
      {!props.isLoggined && <a href="/" className='header__logo-link'>
        <img src={logo} alt='Логотип' className='header__logo' />
      </a>}

      {props.isLoggined && <Navigation />}

      {!props.isLoggined && <div className="header__buttons">
        <a href="#valid" className='header__button header__button-reg'>Регистриция</a>
        <a href="##valid" className='header__button header__button-login'>Войти</a>
      </div>}

    </header>
  );
}

export default Header;
