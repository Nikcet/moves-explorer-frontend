import React from 'react';
import Search from '../SearchForm/Search';
import SavedMoviesCardList from '../SavedMoviesCardList.jsx/SavedMoviesCardList';
import { SearchSavedCards } from '../../contexts/SearchSavedCards';

function SavedMovies(props) {

  const [savedCards, setSavedCards] = React.useState([]);
  // const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    getCards();
  }, []);

  function getCards() {
    let objects = [];
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      if (key !== 'token') {
        objects.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setSavedCards(objects);
    return objects;
  }

  function deleteCard(key) {
    localStorage.removeItem(key);
    getCards();
  }

  function returnCards(cards) {
    setSavedCards(cards);
  }

  return (
    <SearchSavedCards.Provider value={savedCards} >
      <section className="movies">
        <Search onCards={returnCards} isSavedCards={true} getCards={getCards} />
        <SavedMoviesCardList onDeleteCard={deleteCard} />
      </section>
    </SearchSavedCards.Provider>
  );
}

export default SavedMovies;