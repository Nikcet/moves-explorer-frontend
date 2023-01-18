import React from 'react';
import icon from '../../images/search-icon.svg';


function SearchSavedFilms(props) {

  const [searchData, setSearchData] = React.useState('');
  const [isShort, setIsShort] = React.useState(false);

  React.useEffect(() => {
    return localStorage.removeItem('searchedSavedCards');
  }, [])

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    if (target.type === 'checkbox') {
      setIsShort(target.checked);
    } else {
      setSearchData(value);
    }
  }


  function searchCards(event) {
    event.preventDefault();
    props.turnOnPreloader();
    console.log('Поиск...');

    const cardsToSearch = JSON.parse(localStorage.getItem('allSavedFilms'));

    let result = [];
    if (cardsToSearch) {
      result = cardsToSearch.map((card) => {
        let isSearched = false;
        Object.values(card).forEach((el) => {

          if (typeof el === "string") {
            if (el === "") {
              return JSON.parse(localStorage.getItem('allSavedFilms'));
            }
            let condition;
            if (isShort) {
              condition = el.toLowerCase().includes(searchData.toLowerCase()) && card.duration <= 40;
            } else {
              condition = el.toLowerCase().includes(searchData.toLowerCase());
            }

            if (condition) {
              isSearched = true;
              return;
            }
          } else if (el === searchData) {
            isSearched = true;
            return;
          }
        })

        if (isSearched) {
          return card;
        }
      })
    } else {
      alert('Ничего не нашел');
      return;
    }

    console.log('Нашел');
    localStorage.setItem('searchedSavedCards', JSON.stringify(result.filter(card => card !== undefined)));
    props.getSearchedCards();
    props.turnOffPreloader();
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={searchCards}>
        <div className="search__input">
          <label htmlFor='search-input' className="search__icon">
            <img src={icon} alt="Знакчек поиска" className='search__icon-image' />
            <input type='search'
              name='search-input'
              id='search-input'
              className="search__input-field"
              placeholder='Фильм'
              onChange={handleChange}
              value={searchData}
            />
          </label>
          <input type='submit' value='Найти' className="search__input-submit" />
        </div>
        <div className="search__shortmovies">
          <label className="search__switch">
            <input type='checkbox' className="search__checkbox" onChange={handleChange} checked={isShort} />
            <span className="search__switcher"></span>
          </label>
          <p className="search__shortmovies-text">Короткометражки</p>
        </div>
      </form>
      <div className="search__line"></div>
    </section>
  );
}

export default SearchSavedFilms;