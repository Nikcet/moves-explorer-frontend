import React from 'react';
import icon from '../../images/icon__COLOR_invisible.svg';
// import imageSrc from '../../images/pic__COLOR_pic.png';


function MoviesCard(props) {
  const [isSave, setIsSave] = React.useState(false);
  // const [newListCards, setNewListCards] = React.useState([]);
  const URL = 'https://api.nomoreparties.co';
  // console.log('рендер moviesCard')
  // React.useEffect(() => {
  //   if (localStorage.getItem('savedCards')) {
  //     setNewListCards(localStorage.getItem('savedCards'));
  //   } else {
  //     localStorage.setItem('savedCards', []);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   // console.log(newListCards);
  //   // console.log(localStorage);
    
  // }, []);
  
  function saveCardFilm(event) {
    // setNewListCards([...newListCards, props.card]);
    localStorage.setItem(props.card.nameRU, JSON.stringify(props.card));
    // console.log(newListCards);
    setIsSave(true);
  }

  return (
    <li className="card">
      <div className="card__save-widget" >
        {!isSave ?
          <button type="button" className='card__save-button' onClick={saveCardFilm}>Сохранить</button>
          :
          <div className="card__save-icon-circle">
            <img src={icon} alt="Иконка: сохранено" className="card__save-icon" />
          </div>
        }
      </div>
      <a className='card__link' href={props.card.trailerLink} target="_blank" rel="noopener noreferrer">
        <img src={`${URL}/${props.card.image.url}`} alt={`Обложка фильма: ${props.card.nameRU}`} className="card__image" />
      </a>

      <div className="card__signature">
        <p className="card__titile">{props.card.nameRU}</p>
        <div className="card__duration">
          <p className="card__time">{props.card.duration} мин.</p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;