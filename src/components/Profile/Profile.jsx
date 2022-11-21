import React from 'react';
import { updateUser } from '../../utils/MainApi';
import validator from 'validator';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);

  const [newName, setNewName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);



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
      .then(data => { console.log(data) })
      .catch(err => { console.log(err) })
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
              placeholder={currentUser.user.name}
              onChange={handleChange}
              value={newName}
              minLength={2}
            />
          </label>
          <label className="profile__row profile__email">
            <p className="profile__email-label profile__label">E-mail</p>
            <input className="profile__input profile__email-input"
              name='email'
              type="email"
              placeholder={currentUser.user.email}
              onChange={handleChange}
              value={newEmail}
              minLength={2}
            />
          </label>

          {
            !isEdit ? <div className="profile__buttons">
              <input type="submit" value="Редактировать" className="profile__btn profile__edit-btn" onClick={() => {setIsEdit(true)}}/>
              <input type="button" value="Выйти из аккаунта" className="profile__btn profile__exit-btn" onClick={props.signOut} />
            </div> :
              <div className="register__buttons">
                <button type="submit" className='register__submit-btn' disabled={isDisabled}>Сохранить</button>
              </div>
          }
        </form>
      </div>
    </section>
  );
}

export default Profile;