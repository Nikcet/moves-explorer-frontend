import React from 'react';
import Search from '../SearchForm/Search';
import SavedMoviesCardList from '../SavedMoviesCardList.jsx/SavedMoviesCardList';
import { SearchSavedCards } from '../../contexts/SearchSavedCards';
import { getMovies, deleteMovie } from '../../utils/MainApi';

function SavedMovies(props) {

  const [savedCards, setSavedCards] = React.useState([]);

  React.useEffect(() => {
    getCards();
  }, []);

  function getCards() {
    getMovies()
    .then(cards => {
      setSavedCards(cards.movies);
    })
    .catch(err => console.log(err))
  }

  function deleteCard(movieId) {
    deleteMovie(movieId);
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