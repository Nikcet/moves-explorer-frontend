import React from 'react';
// import validator from 'validator';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import ErrorValid from '../ErrorValid/ErrorValid';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [valid, setValid] = React.useState({
    name: '',
    message: '',
    isDisabled: true,
  });
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);


  function handleChange(event) {
    const target = event.target;
    const value = target.value;

    if (target.name === "email") {

      setEmailIsValid(() => validateEmail(target));
    } else if (target.name === "password") {
      setPasswordIsValid(() => validatePassword(target));
    }
    setValidity(() => {
      return {
        name: target.name,
        message: target.validationMessage,
        isDisabled: !(emailIsValid && passwordIsValid),
      }
    });

    target.id === 'email-input' ? setEmail(() => value) : setPassword(() => value);
  }

  function setValidity(obj) {
    setValid(obj);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (emailIsValid && passwordIsValid) {
      props.onLogin({
        email,
        password,
      });
    } else {
      console.log('Вы ввели некорретные данные.')
    }
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
          <input name='password' id='password-input' type="password" className="register__input error-input" onChange={handleChange} value={password} minLength='8' required />
          {valid.name === 'password' && <ErrorValid error={valid} />}
          <div className="register__buttons">
            <button type="submit" className='register__submit-btn' disabled={valid.isDisabled}>Войти</button>
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