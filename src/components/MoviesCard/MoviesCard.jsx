import React from 'react';
import icon from '../../images/icon__COLOR_invisible.svg';
import deleteIcon from '../../images/icon__COLOR_icon-main-delete.svg';
import { postMovie } from '../../utils/MainApi';
import { imageStorageUrl } from '../../utils/config';


function MoviesCard(props) {
  const [isSave, setIsSave] = React.useState(false);
  const [image, setImage] = React.useState('');

  React.useEffect(() => {
    console.log(props.card.image.url)
    if (props.card.image.url){
      setImage(`${imageStorageUrl}${props.card.image.url}`);
    } else {
      setImage(props.card.image);
    }
  }, [])

  function deleteCardFilm() {
    props.onDeleteCard(props.card._id);
  }

  function saveCardFilm(event) {
    postMovie(props.card)
      .then((data) => {
        if (data) {
          return setIsSave(true);
        } else {
          console.log('Фильм не сохранился.');
        }
      })
      .catch((err) => { console.log(err) });
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
        <img src={image} alt={`Обложка фильма: ${props.card.nameRU}`} className="card__image" />
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