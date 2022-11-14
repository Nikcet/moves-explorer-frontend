import React from 'react';
import Search from '../SearchForm/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  return (
    <section className="movies">
      <Search />
      <MoviesCardList />
    </section>
  );
}

export default SavedMovies;