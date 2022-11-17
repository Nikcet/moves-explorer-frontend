import React from 'react';
import validator from 'validator';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({ error: '', errorName: '' });
  const [isDisabled, setIsDisabled] = React.useState(false);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;

    switch (target.id) {
      case 'name-input':
        setName(value);
        break;
      case 'email-input':
        setEmail(value);
        break;
      case 'password-input':
        setPassword(value);
        break;
      default:
        break;
    }
    // console.log(target.validity.valid);
    // console.log(target.validationMessage);
  }

  function validate (input) {
    if (!input.validity.valid) {
      return {
        name: input.name,
        message: input.validityMessage
      }
    }
  }


  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target[0].validationMessage);
    // console.log(event.target[1].validationMessage);
    // console.log(event.target[2].validationMessage);
    // console.log()
      // props.onRegister({
      //   name,
      //   email,
      //   password,
      // });
  }
  return (
    <section className="register">
      <div className="register__content">
        <div className="register__greet">
          <img src={logo} alt='Логиотип' className="register__logo" />
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
          />
          <p className="form__error form__error-name">Что-то пошло не так...</p>
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
          />
          <p className="form__error form__error-email">Что-то пошло не так...</p>
          <label htmlFor="password-input" className="register__label">Пароль</label>
          <input
            id='password-input'
            name='password'
            type="password"
            className="register__input error-input"
            onChange={handleChange}
            value={password}
            required
            minLength="6"
            maxLength="40"
          />
          <p className="form__error form__error-password">Что-то пошло не так...</p>
          <div className="register__buttons">
            <button type="submit" className='register__submit-btn' disabled={isDisabled}>Зарегистрироваться</button>
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