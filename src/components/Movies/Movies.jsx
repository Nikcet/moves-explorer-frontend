import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Search from '../SearchForm/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import { getSavedMovies, deleteMovie } from '../../utils/MainApi';
import { SearchCards } from '../../contexts/SearchCards';
import checkToken from '../../utils/checkToken';
import { useNavigate } from 'react-router-dom';


function Movies(props) {

  const [searchCards, setSearchCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [isPreloader, setIsPreloader] = React.useState(true);

  const navigate = useNavigate();

  const currentUser = React.useContext(CurrentUserContext);


  // Проверяет токен при монтировании компонента
  React.useEffect(() => {
    if (!checkToken()) {
      navigate('/');
    }
  }, []);

  React.useEffect(() => {
    // Если сохранены найденные карточки, отрисовать их
    console.log('Пытается найти searchedCards');
    if (localStorage.getItem('searchedCards') != null) {
      returnCards();
      console.log('Нашел searchedCards');
    } else {
      console.log('Не нашел searchedCards, пошел грузить фильмы с сервера');
      // Иначе выполнить запрос к базе и получить все фильмы
      turnOnPreloader();
      Promise.resolve(moviesApi.getMovies())
        .then(cardsList => {
          // Если в локальном хранилище еще нет найденных карточек, сохранить их туда и отрисовать
          if (!localStorage.getItem('cardsList')) {
            console.log('Зашел положить фильмы в localStorage');
            localStorage.setItem('cardsList', JSON.stringify(cardsList));
            return setSearchCards(cardsList);
          } else {
            // Иначе взять их из локального хранилища
            console.log('Зашел брать фильмы из localStorage');
            return setSearchCards(JSON.parse(localStorage.getItem('cardsList')));
          }
        })
        .catch((err) => {
          console.log("Не загружаются карточки:", err)
          alert("Не загружаются карточки.");
        });
    }

    return getSavedCards();
  }, []);

  function getSavedCards() {
    turnOnPreloader();
    getSavedMovies()
      .then((cards) => {
        setSavedCards(cards);
        turnOffPreloader();
      })
      .catch(err => {
        console.log("Не загружаются сохраненные карточки:", err);
        alert('Не загружаются сохраненные карточки');
      });
  }

  function updateCards() {
    console.log('Обновляет список фильмов...');
    let allSavedFilms = [];
    getSavedMovies()
      .then(cards => {
        allSavedFilms = cards.movies.filter(movie => movie.owner === currentUser._id);
        localStorage.setItem('allSavedFilms', JSON.stringify(allSavedFilms));
        console.log('Сохранил фильмы в localStorage');
      })
      .catch(err => {
        console.log(err);
        alert(err.message);
      });
  }

  function returnCards() {
    const searchedCards = JSON.parse(localStorage.getItem('searchedCards'));
    setSearchCards(searchedCards);
  }

  function deleteCard(movieId) {
    console.log('Удаляет фильм...')
    deleteMovie(movieId)
      .then((data) => {
        if (!data) {
          throw new Error('Не удалось удалить карточку.')
        } else {
            console.log('Карточка удалена.')
            updateCards();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      })
  }


  function turnOnPreloader() {
    setIsPreloader(true);
  }

  function turnOffPreloader() {
    setIsPreloader(false);
  }

  return (
    <SearchCards.Provider value={searchCards}>
      <section className="movies">
        <Search
          getSearchedCards={returnCards}
          getSavedCards={getSavedCards}
          turnOnPreloader={turnOnPreloader}
          turnOffPreloader={turnOffPreloader}
        />
        <MoviesCardList
          savedCards={savedCards}
          isPreloader={isPreloader}
          turnOnPreloader={turnOnPreloader}
          turnOffPreloader={turnOffPreloader}
          getSavedCards={updateCards}
          onDeleteCard={deleteCard}
          isLoggined={props.isLoggined}
        />
      </section>
    </SearchCards.Provider>
  );
}

export default Movies;