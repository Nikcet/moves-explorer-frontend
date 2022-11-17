import React from 'react';
import validator from 'validator';
import ErrorValid from '../ErrorValid/ErrorValid';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [valid, setValid] = React.useState({});

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    
    setValid(validate(target));
    
    target.id === 'email-input' ? setEmail(value) : setPassword(value);
  }

  function validate(input) {
    if (!input.validity.valid) {
      if (input.name === 'email' && !validator.isEmail(input.value)) {
        setIsDisabled(true);
        return {
          name: input.name,
          message: input.validationMessage
        }
      } else {
        setIsDisabled(true);
        return {
          name: input.name,
          message: input.validationMessage
        }
      }
    } else {
      setIsDisabled(false);
      return {
        name: null,
        message: null
      };
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.onLogin({
        email,
        password,
    });
}

  return (
    <section className="login">
      <div className="register__content">
        <div className="register__greet">
          <img src={logo} alt='Логиотип' className="register__logo" />
          <h2 className="register__greeting">Добро пожаловать!</h2>
        </div>
        <form className="register__form" onSubmit={handleSubmit}>
          <label htmlFor="email-input" className="register__label">E-mail</label>
          <input name='email' id='email-input' type="email" className="register__input" onChange={handleChange} value={email} required />
          {valid.name === 'email' && <ErrorValid error={valid} />}
          <label htmlFor="password-input" className="register__label">Пароль</label>
          <input id='password-input' type="password" className="register__input error-input" onChange={handleChange} value={password} required />
          {valid.name === 'password' && <ErrorValid error={valid} />}
          <div className="register__buttons">
            <button type="submit" className='register__submit-btn' disabled={isDisabled}>Войти</button>
            <p className="register__register">
              Еще не зарегистрированы? <Link to='/signup' className='register__login-link'>Регистрация</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;