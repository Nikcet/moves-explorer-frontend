import React from 'react';
import Search from '../SearchForm/Search';
import SavedMoviesCardList from '../SavedMoviesCardList.jsx/SavedMoviesCardList';
import { SearchSavedCards } from '../../contexts/SearchSavedCards';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getSavedMovies, deleteMovie } from '../../utils/MainApi';
import checkToken from '../../utils/checkToken';
import { useNavigate } from 'react-router-dom';

function SavedMovies(props) {

  const [savedCards, setSavedCards] = React.useState([]);

  const currentUser = React.useContext(CurrentUserContext);

  const navigate = useNavigate();

  // Проверяет токен при монтировании компонента
  React.useEffect(() => {
    if (!checkToken()) {
      navigate('/');
    }
  }, []);


  React.useEffect(() => {
    getCards();
  }, []);

  // Получает сохраненные карточки
  function getCards() {
    console.log('getCards')
    let allSavedFilms = [];
    getSavedMovies()
    .then(cards => {
      allSavedFilms = cards.movies.filter(movie => movie.owner === currentUser.user._id);
      localStorage.setItem('allSavedFilms', JSON.stringify(allSavedFilms));
      setSavedCards(allSavedFilms);
      // console.log('savedCardsVar', savedCardsVar);
    })
    .catch(err => console.log(err));
  }

  function deleteCard(movieId) {
    deleteMovie(movieId);
    getCards();
  }

  function returnCards() {
    console.log('returnCards');
    setSavedCards(JSON.parse(localStorage.getItem('searchedCards')));
  }

  console.log('savedCards', savedCards);
  return (
    <SearchSavedCards.Provider value={savedCards} >
      <section className="movies">
        <Search isSavedCards={true} getCards={getCards} getSearchedCards={returnCards}/>
        <SavedMoviesCardList onDeleteCard={deleteCard} />
      </section>
    </SearchSavedCards.Provider>
  );
}

export default SavedMovies;