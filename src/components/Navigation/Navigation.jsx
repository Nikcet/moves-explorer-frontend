import React from 'react';
import accountImage from '../../images/icon__COLOR_icon-main.svg'
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Navigation(props) {

  const [isChecked, setIsChecked] = React.useState(false);

  function checkedHandler(event) {
    if (event.target.className !== 'navigation__box') {
      setIsChecked(!isChecked);
    }
  }


  return (
    <nav className="navigation">
      <Link to='/' className='navigation__logo-link'>
        <img src={logo} alt='Логотип' className='navigation__logo' />
      </Link>
      {props.isLoggined && <>
        <nav className="navigation__links">
          <Link to='/movies' className="navigation__link" onClick={checkedHandler}>Фильмы</Link>
          <Link to='/saved-movies' className="navigation__link" onClick={checkedHandler}>Сохранённые фильмы</Link>
        </nav>
      </>}

      {props.isLoggined && <>
        <div className="navigation__account-vidget navigation__account-vidget_mobile">
          <Link to='/profile' className="navigation__account-vidget">
            <p className="navigation__account-name" onClick={checkedHandler}>Аккаунт</p>
            <div className="navigation__account-circle-icon">
              <img src={accountImage} alt='Иконка' className="navigation__account-icon" />
            </div>
          </Link>
        </div>
      </>}

      {!props.isLoggined && <div className="navigation__buttons navigation__buttons_mobile">
        <Link to='/signup' className='navigation__button' onClick={checkedHandler}>Регистрация</Link>
        <Link to='/signin' className='navigation__button navigation__button-login' onClick={checkedHandler}>Войти</Link>
      </div>}


      <div className="navigation__mobile">
        <input id="menu__toggle" type="checkbox" className='navigation__toggle' checked={isChecked} onChange={() => { }} onClick={checkedHandler} />
        <label className="navigation__btn" htmlFor="menu__toggle">
          <span className='navigation__span'></span>
        </label>

        <nav className="navigation__box">
          {props.isLoggined &&
            <ul className="navigation__list-links">
              <li><Link to='/' className="navigation__link" onClick={checkedHandler}>Главная</Link></li>
              <li><Link to='/movies' className="navigation__link" onClick={checkedHandler}>Фильмы</Link></li>
              <li><Link to='/saved-movies' className="navigation__link" onClick={checkedHandler}>Сохранённые фильмы</Link></li>
            </ul>}
          {props.isLoggined ? <Link to='/profile' className="navigation__account-vidget">
            <p className="navigation__account-name" onClick={checkedHandler}>Аккаунт</p>
            <div className="navigation__account-circle-icon">
              <img src={accountImage} alt='Иконка' className="navigation__account-icon" />
            </div>
          </Link> :
            <div className="navigation__mobile-auth">
              <Link to='/signup' className='navigation__reg' onClick={checkedHandler}>Регистрация</Link>
              <Link to='/signin' className='navigation__auth' onClick={checkedHandler}>Войти</Link>
            </div>
          }
        </nav>
      </div>
    </nav>
  );
}

export default Navigation;