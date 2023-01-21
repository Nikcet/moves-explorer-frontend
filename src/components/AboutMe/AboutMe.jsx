import React from 'react';
import photo from '../../images/photo.jpg'


function AboutMe(props) {
  return (
    <section id='student' className="aboutme">
      <div className="aboutme__main">
        <div className="aboutme__heading">
          <h2 className="aboutme__header">Студент</h2>
          <div className="aboutme__line"></div>
        </div>
        <div className="aboutme__content">
          <div className="aboutme__description">
            <h3 className="aboutme__student-name">Мстислав</h3>
            <h4 className="aboutme__student-profession">Фронтенд-разработчик, 26 лет</h4>
            <p className="aboutme__student-description">Живу в Краснодаре. Есть семья. Закончил КубГУ. Бакалавриат - Радиотехника; Магистратура - Информационные системы. Интересует инженерное дело в целом. Планирую быть не только Frontend-разрабом. Миссия по жизни - созидать, созидать, и еще раз созидать.</p>
            <a href="https://github.com/Nikcet" target="_blank" rel="noreferrer" className="aboutme__link">GitHub</a>
          </div>
          <div className="aboutme__avatar">
            <img src={photo} alt="Фото" className="aboutme__image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;