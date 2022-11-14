import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage(props) {
  const history = useNavigate();
  
  return (
    <section className="error">
      <div className="error__content">
        <h1 className="error__title">404</h1>
        <h2 className="error__subtitle">Страница не найдена</h2>
      </div>
      <button className="error__history-back" onClick={() => history('/')}>Назад</button>
    </section>
  );
}

export default ErrorPage;