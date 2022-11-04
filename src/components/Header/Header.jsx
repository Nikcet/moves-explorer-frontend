import React from 'react';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  console.log(props.isLoggined);
  return (
    <header className="header">
      {!props.isLoggined && <Link to='/' className='header__logo-link'>
        <img src={logo} alt='Логотип' className='header__logo' />
      </Link>}

      {props.isLoggined && <Navigation />}

      {!props.isLoggined && <div className="header__buttons">
        <Link to='/signup' className='header__button header__button-reg'>Регистриция</Link>
        <Link to='/signin' className='header__button header__button-login'>Войти</Link>
      </div>}

    </header>
  );
}

export default Header;
