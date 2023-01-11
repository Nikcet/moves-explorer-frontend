import React from 'react';
import arrow from '../../images/text__COLOR_font-main.svg';

function Portfolio(props) {
  return (
    <section className="portfolio">
      <div className="portfolio__main">
        <h3 className="portfolio__header">Портфолио</h3>
        <ul className="portfolio__links">
          <li className="portfolio__item">
            <a href="https://nikcet.github.io/how-to-learn/" className="portfolio__link" target='_blank' rel='noreferrer'>
              <div className="portfolio__link-block">Статичный сайт</div>
              <img src={arrow} alt="" className="protfolio__link-arrow" />
            </a>
          </li>
          <li className="portfolio__item">
            <a href="https://nikcet.github.io/russian-travel/" className="portfolio__link" target='_blank' rel='noreferrer'>
              <div className="portfolio__link-block">Адаптивный сайт</div>
              <img src={arrow} alt="" className="protfolio__link-arrow" />
            </a>
          </li>
          <li className="portfolio__item">
            <a href="https://nikcet.github.io/mesto/" className="portfolio__link" target='_blank' rel='noreferrer'>
              <div className="portfolio__link-block">Одностраничное приложение</div>
              <img src={arrow} alt="" className="protfolio__link-arrow" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;