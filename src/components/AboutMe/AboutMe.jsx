import React from 'react';
import photo from '../../images/photo.jpg'


function AboutMe(props) {
  return (
    <section className="aboutme">
      <div className="aboutme__main">
        <div className="aboutme__heading">
          <h2 className="aboutme__header">Студент</h2>
          <div className="aboutme__line"></div>
        </div>
        <div className="aboutme__content">
          <div className="aboutme__description">
            <h3 className="aboutme__student-name">Мстислав</h3>
            <h4 className="aboutme__student-profession">Фронтенд-разработчик, 26 лет</h4>
            <p className="aboutme__student-description">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <a href="#/" className="aboutme__link">GitHub</a>
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