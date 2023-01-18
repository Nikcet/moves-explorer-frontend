import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import More from '../More/More';

function SavedMoviesCardList(props) {
  const [visibleCards, setVisibleCards] = React.useState([]);
  const [amountOfCards, setAmountOfCards] = React.useState(9);

  const [amountOfNewCards, setAmountOfNewCards] = React.useState(3);
  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);


  React.useEffect(() => {
    if (localStorage.getItem('allSavedFilms')) {
      console.log('Показывает все сохраненные фильмы.')
      setVisibleCards(JSON.parse(localStorage.getItem('allSavedFilms')).slice(0, amountOfCards));
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('searchedSavedCards')) {
      console.log('Показывает найденные карточки.');
      console.log('savedCards: ', props.savedCards);
      setVisibleCards(JSON.parse(localStorage.getItem('searchedSavedCards')));
    }

    // return () => localStorage.removeItem('searchedSavedCards');
  }, [props.savedCards]);

  // Отслеживает размер окна браузера и если размер окна изменился, меняет количество подгружаемых карточек
  React.useEffect(() => {
    window.onresize = () => { setWindowWidth(window.screen.width) };

    if (windowWidth > 1280) {
      setAmountOfCards(12);
      setAmountOfNewCards(3)
    } else if (windowWidth < 1280 && windowWidth > 480) {
      setAmountOfCards(8);
      setAmountOfNewCards(2);
    } else if (windowWidth < 480 && windowWidth > 320) {
      setAmountOfCards(5);
      setAmountOfNewCards(2);
    }
    console.log('Экран');
    return () => { window.onresize = null }
  }, [windowWidth])

  // Добавляет новые карточки в список для рендера
  function addNewCardsToRender() {
    console.log('Добавляет новые карточки в список для рендера ');
    setVisibleCards(JSON.parse(localStorage.getItem('allSavedFilms')).slice(0, amountOfCards));
    setAmountOfCards(amountOfCards + amountOfNewCards);
  }


  if (visibleCards.length > 0) {
    return (
      <section className="movies-card-list">
        {props.isPreloader ? <Preloader /> : <ul className="card-list">
          {visibleCards.map(item => {
            return (
              <MoviesCard
                key={item._id}
                card={item}
                onDeleteCard={props.onDeleteCard}
                isSaved={true}
              />
            )
          })}
        </ul>}
        {props.savedCards > visibleCards && !props.isPreloader && <More setNewCards={addNewCardsToRender} />}
      </section>
    );
  } else {
    return (
      <section className="movies-card-list">
        {props.isPreloader ? <Preloader /> : <p className='movies-card-list__plug'>Ничего не нашлось.</p>}
      </section>
    )
  }
}

export default SavedMoviesCardList;