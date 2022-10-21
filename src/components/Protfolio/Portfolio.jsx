import React from 'react';
import arrow from '../../images/text__COLOR_font-main.svg';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <div className="portfolio__main">
        <h3 className="portfolio__header">Портфолио</h3>
        <div className="portfolio__links">
          <a href="#/" className="portfolio__link">
            <div className="portfolio__link-block">Статичный сайт</div>
            <img src={arrow} alt="" className="protfolio__link-arrow" />
          </a>
          <a href="#/" className="portfolio__link">
            <div className="portfolio__link-block">Адаптивный сайт</div>
            <img src={arrow} alt="" className="protfolio__link-arrow" />
          </a>
          <a href="#/" className="portfolio__link">
            <div className="portfolio__link-block">Одностраничное приложение</div>
            <img src={arrow} alt="" className="protfolio__link-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;