import React from 'react';
import icon from '../../images/search-icon.svg';
import moviesApi from '../../utils/MoviesApi';


function Search(props) {

  const [searchData, setSearchData] = React.useState('');
  const [isShort, setIsShort] = React.useState(false);
  const [cards, setCards] = React.useState([]);


  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    if (target.type === 'checkbox') {
      setIsShort(target.checked);
    } else {
      setSearchData(value);
    }
  }


  React.useEffect(() => {
    if (!props.isSavedCards) {
      Promise.resolve(moviesApi.getMovies())
        .then(cardsList => {
          setCards(cardsList);
        })
        .catch(err =>
          console.log("Не загружаются карточки:", err.message)
        )
    } 
  }, []);


  function searchCards(event) {
    event.preventDefault();

    let cardsToSearch = props.isSavedCards ? props.getCards() : cards;
    
    const result = cardsToSearch.map((card) => {
      let isSearched = false;
      Object.values(card).forEach((el) => {

        if (typeof el === "string") {
          let condition;
          if (isShort) {
            condition = el.includes(searchData) && card.duration <= 40;
          } else {
            condition = el.includes(searchData);
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
    props.onCards(result.filter(card => card !== undefined));
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
              required
            />
          </label>
          <input type='submit' value='Найти' className="search__input-submit" />
        </div>
        <div className="search__shortmovies">
          <label className="search__switch">
            <input type='checkbox' className="search__checkbox" onChange={handleChange} value={isShort} />
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