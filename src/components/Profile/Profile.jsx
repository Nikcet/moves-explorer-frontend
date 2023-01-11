import React from 'react';
import { updateUser } from '../../utils/MainApi';
import validator from 'validator';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import checkToken from '../../utils/checkToken';
import { useNavigate } from 'react-router-dom';

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);

  const [newName, setNewName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const navigate = useNavigate();

  // Проверяет токен при монтировании компонента
  React.useEffect(() => {
    if (!checkToken()) {
      navigate('/');
    }
  }, []);

  React.useEffect(() => {
    setNewName(currentUser.user.name);
    setNewEmail(currentUser.user.email);
  }, [])


  function handleChange(event) {
    const target = event.target;
    const value = target.value;

    validate(target);

    if (target.name === 'name') {
      setNewName(value);
    } else if (target.name === 'email') {
      setNewEmail(value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    updateUser(newName, newEmail)
      .then(data => {
        props.updateCurrentUser(data.name, data.email);
      })
      .catch(err => { console.log('Не удалось обновить данные: ', err) })
  }


  function validate(input) {
    if (!input.validity.valid) {
      if (input.name === 'email' && !validator.isEmail(input.value)) {
        setIsDisabled(true);
        return {
          name: input.name,
          message: input.validationMessage
        }
      } else {
        setIsDisabled(true);
        return {
          name: input.name,
          message: input.validationMessage
        }
      }
    } else {
      setIsDisabled(false);
      return {
        name: null,
        message: null
      };
    }
  }

  function toggle_button() {
    setIsEdit(!isEdit);
  }

  return (
    <section className="profile">
      <div className="profile__content">
        <h3 className="profile__greet">{`Привет, ${currentUser.user.name}!`}</h3>
        <form className="profile__form" onSubmit={handleSubmit}>
          <label className="profile__row profile__name">
            <p className="profile__name-label profile__label">Имя</p>
            <input className="profile__input profile__name-input"
              name='name'
              type="text"
              onChange={handleChange}
              value={newName}
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
              value={newEmail}
              minLength={2}
              readOnly={!isEdit}
            />
          </label>

          {
            !isEdit ? <div className="profile__buttons">
              <input type="submit" value="Редактировать" className="profile__btn profile__edit-btn" onClick={toggle_button} />
              <input type="button" value="Выйти из аккаунта" className="profile__btn profile__exit-btn" onClick={props.signOut} />
            </div> :
              <div className="register__buttons">
                <button type="submit" className='register__submit-btn' disabled={isDisabled} onClick={toggle_button}>Сохранить</button>
              </div>
          }
        </form>
      </div>
    </section>
  );
}

export default Profile;