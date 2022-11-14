import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import More from '../More/More';



function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <ul className="card-list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      {/* <Preloader /> */}
      <More />
    </section>
  );
}

export default MoviesCardList;