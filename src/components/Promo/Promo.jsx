import React from 'react';

function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__back">
        <div className="promo__header-wrap">
          <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
        </div>
        <div className="promo__anchors">
          <a href="#about" className="promo__anchor">О проекте</a>
          <a href="#techs" className="promo__anchor">Технологии</a>
          <a href="#student" className="promo__anchor">Студент</a>
        </div>
      </div>
    </section>
  );
}

export default Promo;