import React from 'react';
import validator from 'validator';
import { useContext } from 'react';
import { updateUser } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import checkToken from '../../utils/checkToken';
import validateEmail from '../../utils/validateEmail';


function Profile(props) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [nameIsValid, setNameIsValid] = React.useState(false);


  // Проверяет токен при монтировании компонента
  React.useEffect(() => {
    if (!checkToken()) {
      props.signOut();
      setIsEdit(false);
      setIsDisabled(true);
    }
  }, []);

  // Устанавливает новое текущее имя, если старое изменилось
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser])

  // Проверяет email
  React.useEffect(() => {
    if (email) {
      setEmailIsValid((!isCurrentUser(email)) && validateEmail(email));
    }
  }, [email]);

  // Проверяет имя
  React.useEffect(() => {
    if (name) {
      setNameIsValid((!isCurrentUser(name)) && name.length > 0);
    }
  }, [name]);

  // Переключает кнопку
  React.useEffect(() => {
    setIsDisabled(!nameIsValid && !emailIsValid);
  }, [nameIsValid, emailIsValid])


  // Отслеживает изменения данных в полях
  function handleChange(event) {
    const target = event.target;
    const value = target.value;

    target.name === 'name' ? setName(value) : setEmail(value);
  }

  // Отслеживает отправку данных
  function handleSubmit(event) {
    event.preventDefault();

    updateUser(name, email)
      .then((data) => {
        if (data) {
          props.updateCurrentUser({name: data.name, email: data.email, _id: currentUser._id});
          toggleButton();
          alert('Имя успешно изменено.');
        } else {
          props.updateCurrentUser(currentUser);
          throw new Error('Не удалось обновить данные.');
        }
      })
      .catch(err => {
        console.log(err);
        alert(err.message);
        setName(currentUser.name);
        setEmail(currentUser.email);
      })
  }

  function isCurrentUser(string) {
    return currentUser.name === string || currentUser.email === string;
  }

  function toggleButton() {
    setIsEdit(!isEdit);
  }

  return (
    <section className="profile">
      <div className="profile__content">
        <h3 className="profile__greet">{`Привет, ${currentUser.name}!`}</h3>
        <form id="profile_form" className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__row profile__name">
            <p className="profile__name-label profile__label">Имя</p>
            <input className="profile__input profile__name-input"
              name='name'
              type="text"
              onChange={handleChange}
              value={name}
              minLength={2}
              readOnly={!isEdit}
            />
          </label>
          <label className="profile__row profile__email">
            <p className="profile__email-label profile__label">E-mail</p>
            <input className="profile__input profile__email-input"
              name='email'
              type="email"
              onChange={handleChange}
              value={email}
              minLength={2}
              readOnly={!isEdit}
            />
          </label>

          {
            !isEdit ? <div className="profile__buttons">
              <input type="button" value="Редактировать" className="profile__btn profile__edit-btn" onClick={toggleButton} />
              <input type="button" value="Выйти из аккаунта" className="profile__btn profile__exit-btn" onClick={props.signOut} />
            </div> :
              <div className="profile__buttons">
                <button type="submit" form='profile_form' className='register__submit-btn' disabled={isDisabled} onClick={handleSubmit}>Сохранить</button>
                <button type="button" form='profile_form' className='register__cancel-btn' onClick={toggleButton}>Отменить</button>
              </div>
          }
        </form>
      </div>
    </section>
  );
}

export default Profile;