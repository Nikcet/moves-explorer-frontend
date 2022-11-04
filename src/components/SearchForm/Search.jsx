import React from 'react';
import icon from '../../images/search-icon.svg';


function Search(props) {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__input">
          <label htmlFor='search-input' className="search__icon">
            <img src={icon} alt="Знакчек поиска" className='search__icon-image' />
            <input type='search' name='search-input' id='search-input' className="search__input-field" placeholder='Фильм' />
          </label>
          <input type='submit' value='Найти' className="search__input-submit" />
        </div>
        <div className="search__shortmovies">
          <label className="search__switch">
            <input type='checkbox' className="search__checkbox"/>
            <span className="search__switcher"></span>
          </label>
          <p className="search__shortmovies-text">Короткометражки</p>
        </div>
      </form>
      <div className="search__line"></div>
    </section>
  );
}

export default Search;