import React from 'react';
import Search from '../SearchForm/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  return (
    <section className="movies">
      <Search />
      <MoviesCardList />
      {/* <Preloader /> */}
    </section>
  );
}

export default Movies;