import React from 'react';

function Techs(props) {
  return (
    <section id='techs' className="techs">
      <div className="techs__main">
        <div className="techs__heading">
          <h2 className="techs__header">Технологии</h2>
          <div className="techs__line"></div>
        </div>
        <div className="techs__content">
          <div className="techs__description">
              <h2 className="techs__seven-techs">7 технологий</h2>
              <p className="techs__text">
              На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
              </p>
          </div>
          <div className="techs__skills">
            <ul className="techs__list">
              <li className="techs__technology">HTML</li>
              <li className="techs__technology">CSS</li>
              <li className="techs__technology">JS</li>
              <li className="techs__technology">React</li>
              <li className="techs__technology">Git</li>
              <li className="techs__technology">Express.js</li>
              <li className="techs__technology">mongoDB</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Techs;