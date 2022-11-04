import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login(props) {
  
  return (
    <section className="login">
      <div className="register__content">
        <div className="register__greet">
          <img src={logo} alt='Логиотип' className="register__logo" />
          <h2 className="register__greeting">Добро пожаловать!</h2>
        </div>
        <form className="register__form">
          <label htmlFor="email-input" className="register__label">E-mail</label>
          <input id='email-input' type="email" className="register__input" />
          <p className="form__error">Что-то пошло не так...</p>
          <label htmlFor="password-input" className="register__label">Пароль</label>
          <input id='password-input' type="password" className="register__input error-input" />
          <p className="form__error">Что-то пошло не так...</p>
        </form>
        <div className="register__buttons">
          <button type="submit" className='register__submit-btn'>Войти</button>
          <p className="register__register">
            Еще не зарегистрированы? <Link to='/signin' className='register__login-link'>Регистрация</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;