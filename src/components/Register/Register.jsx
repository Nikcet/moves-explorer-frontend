import React from 'react';
import ErrorValid from '../ErrorValid/ErrorValid';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [isInputsDisabled, setIsInputDisabled] = React.useState(false);

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

    if (target.id === 'name-input') setName(value)
    else if (target.id === 'email-input') setEmail(value)
    else if (target.id === 'password-input') setPassword(value)

    setValid({
      name: target.name,
      message: target.validationMessage,
      isDisabled: !(emailIsValid && passwordIsValid),
    });

  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsInputDisabled(true);
    if (!valid.isDisabled) {
      props.onRegister({
        name,
        email,
        password,
      });
    }
  }
  return (
    <section className="register">
      <div className="register__content">
        <div className="register__greet">
          <Link to='/' className='register__logo-link'>
            <img src={logo} alt='Логотип' className='register__logo' />
          </Link>
          <h2 className="register__greeting">Добро пожаловать!</h2>
        </div>
        <form className="register__form" onSubmit={handleSubmit} name='register'>
          <label htmlFor="name-input" className="register__label">Имя</label>
          <input
            id='name-input'
            name='name'
            type="text"
            className="register__input"
            onChange={handleChange}

            value={name}
            required
            minLength="2"
            maxLength="40"
            disabled={isInputsDisabled}
          />
          {valid.name === 'name' && <ErrorValid error={valid} />}
          <label htmlFor="email-input" className="register__label">E-mail</label>
          <input
            id='email-input'
            name='email'
            type="email"
            className="register__input"
            onChange={handleChange}
            value={email}
            required
            minLength="2"
            disabled={isInputsDisabled}
          />
          {valid.name === 'email' && <ErrorValid error={valid} />}
          <label htmlFor="password-input" className="register__label">Пароль</label>
          <input
            id='password-input'
            name='password'
            type="password"
            className="register__input error-input"
            onChange={handleChange}
            value={password}
            required
            minLength="8"
            maxLength="40"
            disabled={isInputsDisabled}
          />
          {valid.name === 'password' && <ErrorValid error={valid} />}
          <div className="register__buttons">
            <button type="submit" className='register__submit-btn' disabled={valid.isDisabled}>Зарегистрироваться</button>
            <p className="register__login">
              Уже зарегистрированы? <Link to='/signin' className='register__login-link'>Войти</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;