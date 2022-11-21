import React from 'react';
import icon from '../../images/icon__COLOR_invisible.svg';
import deleteIcon from '../../images/icon__COLOR_icon-main-delete.svg';
import {postMovie} from '../../utils/MainApi';
// import imageSrc from '../../images/pic__COLOR_pic.png';


function MoviesCard(props) {
  const [isSave, setIsSave] = React.useState(false);
  const URL = 'https://api.nomoreparties.co';

  function deleteCardFilm() {
    props.onDeleteCard(props.card.nameRU);
  }

  function saveCardFilm(event) {
    // console.log(props.card)
    // postMovie(props.card)
    // .then((data) => {console.log(data)})
    // .catch((err) => {console.log(err)});
    localStorage.setItem(props.card.nameRU, JSON.stringify(props.card));
    setIsSave(true);
  }

  return (
    <li className="card">
      {!props.isSaved ? <div className="card__save-widget" >
        {!isSave ? <button type="button" className='card__save-button' onClick={saveCardFilm}>Сохранить</button>
          :
          <div className="card__save-icon-circle">
            <img src={icon} alt="Иконка: сохранено" className="card__save-icon" />
          </div>
        }
      </div> :
        <div className="card__delete-widget">
          <button className="card__delete-button" type="button" onClick={deleteCardFilm}>
            <div className="card__delete-icon-circle">
              <img src={deleteIcon} alt="Иконка: удалить" className="card__delete-icon" />
            </div>
          </button>
        </div>
      }


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