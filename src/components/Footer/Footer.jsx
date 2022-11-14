import React from 'react';

function Footer(props) {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__whose">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        </div>
        <div className="footer__footer">
          <p className="footer__copyright">&copy; 2022</p>
          <div className="footer__links">
            <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
            <a href="https://github.com/Nikcet" target='_blank' rel='noreferrer' className="footer__link">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;