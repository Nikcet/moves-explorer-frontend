import React from 'react';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import ErrorValid from '../ErrorValid/ErrorValid';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);


  const [valid, setValid] = React.useState({
    name: '',
    message: '',
    isDisabled: true,
  });

  React.useEffect(() => {
    if (email) {
      console.log('Проверяет email');
      setEmailIsValid(validateEmail(email));
    }
  }, [email]);

  React.useEffect(() => {
    if (password) {
      console.log('Проверяет пароль');
      setPasswordIsValid(validatePassword(password));
    }
  }, [password]);

  React.useEffect(() => {
    setValid({
      name: '',
      message: '',
      isDisabled: !(emailIsValid && passwordIsValid),
    });
  }, [emailIsValid, passwordIsValid]);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;

    target.id === 'email-input' ? setEmail(value) : setPassword(value);

    setValid({
      name: target.name,
      message: target.validationMessage,
      isDisabled: !(emailIsValid && passwordIsValid),
    });
  }


  function handleSubmit(event) {
    event.preventDefault();
    if (emailIsValid && passwordIsValid) {
      props.onLogin({
        email,
        password,
      });
    } else {
      console.log('Вы ввели некорретные данные.');
      alert('Вы ввели некорретные данные.');
    }
  }

  return (
    <section className="login">
      <div className="register__content">
        <div className="register__greet">
          <Link to='/' className='register__logo-link'>
            <img src={logo} alt='Логотип' className='register__logo' />
          </Link>
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