import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import More from '../More/More';
import { SearchCards } from '../../contexts/SearchCards';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';




function MoviesCardList(props) {
  const [visibleCards, setVisibleCards] = React.useState([]);
  const [amountOfCards, setAmountOfCards] = React.useState(9);

  const [amountOfNewCards, setAmountOfNewCards] = React.useState(3);
  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);

  const searchedCards = React.useContext(SearchCards);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (searchedCards.length > 0) {
      setVisibleCards(searchedCards);
    }
  }, [searchedCards]);

  // Отслеживает размер окна браузера и если размер окна изменился, меняет количество подгружаемых карточек
  React.useEffect(() => {
    window.onresize = () => { setWindowWidth(window.screen.width) };

    if (windowWidth < 1280) {
      setAmountOfNewCards(2);
    } else {
      setAmountOfNewCards(3);
    }
    return () => { window.onresize = null }
  }, [windowWidth])

  // Добавляет новые карточки в список для рендера
  function newCards() {
    const totalAmount = amountOfCards + amountOfNewCards;
    setAmountOfCards(totalAmount);
    console.log('searchedCards', searchedCards);
    setVisibleCards(searchedCards.slice(0, totalAmount));
  }

  // Проверяет, сохранены ли каротчки в личной библиотеке
  function checkCardFilmForSave(collection, element) {
    let filteredSavedCards;
    try {
      filteredSavedCards = collection.some((current) => current.nameRU === element.nameRU && current.owner === currentUser.user._id);
    } catch (err) {
      filteredSavedCards = false;
    }
    return filteredSavedCards;
  }

  if (visibleCards.length > 0) {
    return (
      <section className="movies-card-list">
        {props.isPreloader ? <Preloader /> : <ul className="card-list">
          {visibleCards.map(item => {
            return (
              <MoviesCard
                key={item.id}
                card={item}
                isSavedCard={checkCardFilmForSave(props.savedCards.movies, item)}
              />
            )
          })}
        </ul>}
        {searchedCards > visibleCards && !props.isPreloader && <More setNewCards={newCards} />}
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

export default MoviesCardList;