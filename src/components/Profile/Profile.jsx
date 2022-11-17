import React from 'react';

function Profile(props) {

  
  
  return (
    <section className="profile">
      <div className="profile__content">
        <h3 className="profile__greet">Привет, Виталий!</h3>
        <form className="profile__form">
          <label className="profile__row profile__name">
            <p className="profile__name-label profile__label">Имя</p>
            <input type="text" className="profile__input profile__name-input" placeholder='Виталий'/>
          </label>
          <label className="profile__row profile__email">
            <p className="profile__email-label profile__label">E-mail</p>
            <input type="email" className="profile__input profile__email-input" placeholder='pochta@yandex.ru'/>
          </label>

          <div className="profile__buttons">
            <input type="button" value="Редактировать" className="profile__btn profile__edit-btn" />
            <input type="button" value="Выйти из аккаунта" className="profile__btn profile__exit-btn" onClick={props.signOut()} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;