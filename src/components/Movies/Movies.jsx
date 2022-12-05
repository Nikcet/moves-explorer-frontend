import React from 'react';
import Search from '../SearchForm/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import { SearchCards } from '../../contexts/SearchCards';



function Movies(props) {

  const [searchCards, setSearchCards] = React.useState([]);

  React.useEffect(() => {
    Promise.resolve(moviesApi.getMovies())
      .then(cardsList => {
        if (!localStorage.getItem('cardsList')) {
          console.log('Зашел в localStorage');
          return localStorage.setItem('cardsList', JSON.stringify(cardsList));
        } else {
          return setSearchCards(JSON.parse(localStorage.getItem('cardsList')));
        }
      })
      .catch(err =>
        console.log("Не загружаются карточки:", err)
      )
  }, []);

  function returnCards(cards) {
    setSearchCards(cards);
  }

  return (
    <SearchCards.Provider value={searchCards}>
      <section className="movies">
        <Search onCards={returnCards} />
        <MoviesCardList />
      </section>
    </SearchCards.Provider>
  );
}

export default Movies;