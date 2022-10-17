/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.css';
import React from 'react';
import logo from '../../images/logo.png';

function Header(props) {
  return (
    <div className="header">
      <a href="/">
        <img src={logo} alt='Логотип' className='header__logo' />
      </a>
      <div className="header__buttons">
        <a href="#" className='header__button header__button-reg'>Регистриция</a>
        <a href="#" className='header__button header__button-login'>Войти</a>
      </div>
    </div>
  );
}

export default Header;
