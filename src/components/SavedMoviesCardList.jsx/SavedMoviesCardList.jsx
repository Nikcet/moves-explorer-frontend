import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import More from '../More/More';
import { SearchSavedCards } from '../../contexts/SearchSavedCards';

function SavedMoviesCardList(props) {
  const [isPreloader, setIsPreloader] = React.useState(true);
  const [visibleCards, setVisibleCards] = React.useState([]);
  const [amountOfCards, setAmountOfCards] = React.useState(9);

  const [amountOfNewCards, setAmountOfNewCards] = React.useState(3);
  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);

  const savedCards = React.useContext(SearchSavedCards);

  // Держит прелоадер, пока список карточек пустой
  React.useEffect(() => {
    if (savedCards.length > 0) {
      setIsPreloader(false);
      console.log('setVisibleCards(savedCards)', savedCards);
      setVisibleCards(savedCards);
    } else {
      setIsPreloader(true);
    }
  }, [savedCards]);

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
  async function addNewCardsToRender() {
    const totalAmount = amountOfCards + amountOfNewCards;
    setAmountOfCards(totalAmount);
    let allSavedFilms = [];
    try {
      allSavedFilms = JSON.parse(localStorage.getItem('allSavedFilms')).slice(0, totalAmount);
      setVisibleCards(allSavedFilms);
    } catch (err) {
      console.log(err);
    }
  }
  

  if (visibleCards.length > 0) {
    return (
      <section className="movies-card-list">
        {isPreloader ? <Preloader /> : <ul className="card-list">
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
        {savedCards > visibleCards && !isPreloader && <More setNewCards={addNewCardsToRender}/>}
      </section>
    );
  } else {
    return (
    <section className="movies-card-list">
      {isPreloader ? <Preloader /> : <p className='movies-card-list__plug'>Ничего не нашлось.</p>}
    </section>
    )
  }
}

export default SavedMoviesCardList;