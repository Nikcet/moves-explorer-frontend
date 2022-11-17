import React from 'react';
import Search from '../SearchForm/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SearchSavedCards } from '../../contexts/SearchSavedCards';

function SavedMovies(props) {

  const [searchSavedCards, setSearchSavedCards] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  // React.useEffect(() => {
  //   // console.log(localStorage);
  //   // for (let key in localStorage) {
  //   //   setCards([...cards, JSON.parse(localStorage.getItem(key))])
  //   // }
  //   // setCards(localStorage.getItem());
  // }, []);

  function returnCards(cards) {
    setSearchSavedCards(cards);
  }

  return (
    <SearchSavedCards.Provider value={searchSavedCards} >
      <section className="movies">
        <Search onCards={returnCards} />
        <MoviesCardList />
      </section>
    </SearchSavedCards.Provider>
  );
}

export default SavedMovies;