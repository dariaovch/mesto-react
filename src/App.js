import React from 'react';
import logo from './images/logo.svg';
import './index.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleUpdateAvatarClick() {
    setIsUpdateAvatarPopupOpen(!isUpdateAvatarPopupOpen);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(!isAddCardPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsUpdateAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
  }

  return (
    <div className="page">
    <div className="page__container">
          <Header />

          <Main onEditProfile={handleEditProfileClick} onUpdateAvatar={handleUpdateAvatarClick} onAddCard={handleAddCardClick} />
            
          <Footer />
        </div>

        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input className="popup__input popup__input_name" type="text" name="name" id="name" value="Жак-Ив Кусто" required minlength="2" maxlength="40" />
                <span className="popup__form-error" id="name-error"></span>
                <input className="popup__input popup__input_occupation" type="text" name="about" id="occupation" value="Исследователь океана" required minlength="2" maxlength="200" />
                <span className="popup__form-error" id="occupation-error"></span>
        </PopupWithForm>

        <PopupWithForm name="update-avatar" title="Обновить аватар" isOpen={isUpdateAvatarPopupOpen} onClose={closeAllPopups}>
              <input className="popup__input popup__input_avatar-url" type="url" name="url" id="avatar-url" placeholder="Ссылка на картинку" required />
              <span className="popup__form-error" id="avatar-url-error"></span>
        </PopupWithForm>

        <PopupWithForm name="add-card" title="Новое место" isOpen={isAddCardPopupOpen} onClose={closeAllPopups}>
                <input className="popup__input popup__input_place" type="text" name="name" id="place" placeholder="Название" required minlength="1" maxlength="30" />
                <span className="popup__form-error" id="place-error"></span>
                <input className="popup__input popup__input_link" type="url" name="link" id="link" placeholder="Ссылка на картинку" required />
                <span className="popup__form-error" id="link-error"></span>
        </PopupWithForm>

        <PopupWithImage />

        <PopupWithForm name="delete-card" title="Вы уверены?">
                <h2 className="popup__heading popup__heading_type_small-popup">Вы уверены?</h2>
                <button type="submit" className="popup__save-button popup__save-button_type_small-popup">Да</button>
        </PopupWithForm>

        <template className="cards__template">
          <li className="cards__item">
            <button className="cards__delete-button" type="button" aria-label="delete"></button>
            <img className="cards__image" alt="Фотография места" />
            <div className="cards__name-container">
                  <h2 className="cards__heading"></h2>
                  <div className="cards__like-container"><button className="cards__like-button" type="button" aria-label="like"></button><p className="cards__like-counter">0</p></div>
            </div>
          </li>
        </template>
</div>
);
}

export default App;
