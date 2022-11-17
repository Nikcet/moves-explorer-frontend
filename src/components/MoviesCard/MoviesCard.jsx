import React from 'react';
import imageSrc from '../../images/pic__COLOR_pic.png';
import icon from '../../images/icon__COLOR_invisible.svg';


function MoviesCard(props) {
  const [isSave, setIsSave] = React.useState(false);
  const altText = 'Какой-то заменяемый текст';
  const URL = 'https://api.nomoreparties.co';

  const [card, setCard] = React.useState({});
  React.useEffect(() => {
    if (props.card) {
      setCard(props.card);
    } else {
      console.log('Карточка не отрисовалась');
    }
  }, []);

  function saveCardFilm(event) {
    setIsSave(true);
  }

  return (
    <li className="card" onClick={saveCardFilm}>
      <div className="card__save-widget" >
        {!isSave ?
          <button type="button" className='card__save-button'>Сохранить</button>
          :
          <div className="card__save-icon-circle">
            <img src={icon} alt="Иконка: сохранено" className="card__save-icon" />
          </div>
        }
      </div>
      <a className='card__link' href={props.card.trailerLink} target="_blank" rel="noopener noreferrer">
        <img src={`${URL}/${props.card.image.url}`} alt={altText} className="card__image" />
      </a>

      <div className="card__signature">
        <p className="card__titile">{card.nameRU}</p>
        <div className="card__duration">
          <p className="card__time">{card.duration} мин.</p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;