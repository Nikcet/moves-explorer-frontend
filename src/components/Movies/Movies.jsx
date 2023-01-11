import React from 'react';
import Search from '../SearchForm/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import { getSavedMovies } from '../../utils/MainApi';
import { SearchCards } from '../../contexts/SearchCards';
import checkToken from '../../utils/checkToken';
import { useNavigate } from 'react-router-dom';


function Movies(props) {

  const [searchCards, setSearchCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);

  const navigate = useNavigate();

  // Проверяет токен при монтировании компонента
  React.useEffect(() => {
    if (!checkToken()) {
      navigate('/');
    }
  }, []);

  React.useEffect(() => {
    // Если сохранены найденные карточки, отрисовать их
    console.log('Пытается найти searchedCards');
    // setSearchCards(localStorage.getItem('searchedCards'));
    if (localStorage.getItem('searchedCards') != null) {
      returnCards();
      console.log('Нашел searchedCards');
    } else {
      console.log('Не нашел searchedCards, пошел грузить фильмы с сервера');
      // Иначе выполнить запрос к базе и получить все фильмы
      Promise.resolve(moviesApi.getMovies())
        .then(cardsList => {
          // Если в локальном хранилище еще нет найденных карточек, сохранить их туда и отрисовать
          if (!localStorage.getItem('cardsList')) {
            console.log('Зашел положить фильмы в localStorage');
            return localStorage.setItem('cardsList', JSON.stringify(cardsList));
          } else {
            // Иначе взять их из локального хранилища
            console.log('Зашел брать фильмы из localStorage');
            return setSearchCards(JSON.parse(localStorage.getItem('cardsList')));
          }
        })
        .catch(err =>
          console.log("Не загружаются карточки:", err)
        );
    }

    return getSavedCards();
  }, []);

  function getSavedCards() {
    getSavedMovies()
      .then((cards) => {
        setSavedCards(cards);
      })
      .catch(err => console.log("Не загружаются сохраненные карточки:", err));
  }

  function returnCards() {
    const searchedCards = JSON.parse(localStorage.getItem('searchedCards'));
    setSearchCards(searchedCards);
  }

  return (
    <SearchCards.Provider value={searchCards}>
      <section className="movies">
        <Search getSearchedCards={returnCards} getSavedCards={getSavedCards}/>
        <MoviesCardList savedCards={savedCards} />
      </section>
    </SearchCards.Provider>
  );
}

export default Movies;