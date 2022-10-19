import React from 'react';

function AboutProject(props) {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__heading">
          <h2 className="about__header">О проекте</h2>
          <div className="about__line"></div>
        </div>
        <div className="about__main">
          <div className="about__columns">
            <div className="about__column">
              <h3 className="about__title">Дипломный проект включал 5 этапов</h3>
              <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about__column">
              <h3 className="about__title">На выполнение диплома ушло 5 недель</h3>
              <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
          </div>
          <div className="about__duration">
            <div className="about__week-one">
              <p className="about__week-one-title">1 неделя</p>
              <p className="about__week-one-subtitle">Back-end</p>
            </div>
            <div className="about__week-four">
              <p className="about__week-four-title">4 недели</p>
              <p className="about__week-four-subtitle">Front-end</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;