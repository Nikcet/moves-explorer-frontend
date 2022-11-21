import React from 'react';
import accountImage from '../../images/icon__COLOR_icon-main.svg'
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <nav className="navigation">
      <Link to='/' className='navigation__logo-link'>
        <img src={logo} alt='Логотип' className='navigation__logo' />
      </Link>
      <nav className="navigation__links">
        <Link to='/movies' className="navigation__link">Фильмы</Link>
        <Link to='/saved-movies' className="navigation__link">Сохранённые фильмы</Link>
      </nav>
      <div className="navigation__account-vidget navigation__account-vidget_mobile">
        <Link to='/profile' className="navigation__account-vidget">
          <p className="navigation__account-name">Аккаунт</p>
          <div className="navigation__account-circle-icon">
            <img src={accountImage} alt='Иконка' className="navigation__account-icon" />
          </div>
        </Link>
      </div>

      <div className="navigation__mobile">
        <input id="menu__toggle" type="checkbox" className='navigation__toggle' />
        <label className="navigation__btn" htmlFor="menu__toggle">
          <span className='navigation__span'></span>
        </label>

        <nav className="navigation__box">
          <ul className="navigation__list-links">
            <li><Link to='/' className="navigation__link">Главная</Link></li>
            <li><Link to='/movies' className="navigation__link">Фильмы</Link></li>
            <li><Link to='/saved-movies' className="navigation__link">Сохранённые фильмы</Link></li>
          </ul>
          <Link to='/profile' className="navigation__account-vidget">
            <p className="navigation__account-name">Аккаунт</p>
            <div className="navigation__account-circle-icon">
              <img src={accountImage} alt='Иконка' className="navigation__account-icon" />
            </div>
          </Link>
        </nav>
      </div>
    </nav>
  );
}

export default Navigation;