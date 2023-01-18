import React from 'react';
import SearchSavedFilms from '../SearchForm/SearchSavedFilms';
import SavedMoviesCardList from '../SavedMoviesCardList.jsx/SavedMoviesCardList';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getSavedMovies, deleteMovie } from '../../utils/MainApi';
import checkToken from '../../utils/checkToken';
import { useNavigate } from 'react-router-dom';

function SavedMovies(props) {
  const [savedCards, setSavedCards] = React.useState([]);
  const [isPreloader, setIsPreloader] = React.useState(true);

  const currentUser = React.useContext(CurrentUserContext);

  const navigate = useNavigate();

  // Проверяет токен при монтировании компонента
  React.useEffect(() => {
    if (!checkToken()) {
      navigate('/');
    }
  }, []);


  React.useEffect(() => {
    if (savedCards.length === 0 || localStorage.getItem('allSavedFilms') === null) {
      getCards();
    }
  }, []);

  // Получает сохраненные карточки
  function getCards() {
    console.log('Получает сохраненные карточки...');
    setIsPreloader(true);
    let allSavedFilms = [];
    getSavedMovies()
      .then(cards => {
        allSavedFilms = cards.movies.filter(movie => movie.owner === currentUser.user._id);
        localStorage.setItem('allSavedFilms', JSON.stringify(allSavedFilms));
        setSavedCards(allSavedFilms);
        setIsPreloader(false);
        console.log('Сохранил фильмы в состояние и localStorage');
      })
      .catch(err => console.log(err));
  }

  function deleteCard(movieId) {
    deleteMovie(movieId);
    getCards();
  }

  function getSearchedCards() {
    console.log('Кладет найденные сохраненные фильмы в состояние');
    setSavedCards(JSON.parse(localStorage.getItem('searchedSavedCards')));
  }

  function turnOnPreloader() {
    setIsPreloader(true);
  }

  function turnOffPreloader() {
    setIsPreloader(false);
  }

  return (
    <section className="movies">
      <SearchSavedFilms
        getCards={getCards}
        getSearchedCards={getSearchedCards}
        turnOnPreloader={turnOnPreloader}
        turnOffPreloader={turnOffPreloader}
      />
      <SavedMoviesCardList onDeleteCard={deleteCard} isPreloader={isPreloader} savedCards={savedCards} />
    </section>
  );
}

export default SavedMovies;