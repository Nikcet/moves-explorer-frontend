import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import More from '../More/More';
import { SearchCards } from '../../contexts/SearchCards';




function MoviesCardList(props) {
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [visibleCards, setVisibleCards] = React.useState([]);
  const [amountOfCards, setAmountOfCards] = React.useState(9);

  const [amountOfNewCards, setAmountOfNewCards] = React.useState(3);
  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);

  const searchedCards = React.useContext(SearchCards);

  // Держит прелоадер, пока список карточек пустой
  React.useEffect(() => {
    if (searchedCards.length > 0) {
      setIsPreloader(false);
      newCards();
    } else {
      setIsPreloader(true);
    }
  }, [searchedCards]);

  // Отслеживает размер окна браузера и если размер окна изменился, меняет количество подгружаемых карточек
  React.useEffect(() => {
    window.onresize = () => {setWindowWidth(window.screen.width)};
    
    if (windowWidth < 1280) {
      setAmountOfNewCards(2);
    } else {
      setAmountOfNewCards(3);
    }
    return () => {window.onresize = null}
  }, [windowWidth])

  // Добавляет новые карточки в список для рендера
  function newCards() {
    const totalAmount = amountOfCards + amountOfNewCards;
    setAmountOfCards(totalAmount);
    setVisibleCards(searchedCards.slice(0, totalAmount));

  }

  return (
    <section className="movies-card-list">
      {isPreloader ? <Preloader /> : <ul className="card-list">
        {visibleCards.map(item => {
          return (
            <MoviesCard
              key={item.id}
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onDeleteCard={props.onDeleteCard}
            />
          )
        })}
      </ul>}
      {searchedCards > visibleCards && !isPreloader && <More setNewCards={newCards}/>}
    </section>
  );
}

export default MoviesCardList;