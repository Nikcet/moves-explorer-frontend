import React from 'react';
import imageSrc from '../../images/pic__COLOR_pic.png';
import icon from '../../images/icon__COLOR_invisible.svg';


function MoviesCard(props) {
  const isSave = false;
  const altText = 'Какой-то заменяемый текст'

  return (
    <li className="card">
      <img src={imageSrc} alt={altText} className="card__image" />
      <div className="card__save-widget">
        {!isSave ?
          <button type="button" className='card__save-button'>Сохранить</button>
          :
          <div className="card__save-icon-circle">
            <img src={icon} alt="Иконка: сохранено" className="card__save-icon" />
          </div>
        }
      </div>
      <div className="card__signature">
      <p className="card__titile">33 слова о дизайне</p>
        <div className="card__duration">
          <p className="card__time">1ч 17м</p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;