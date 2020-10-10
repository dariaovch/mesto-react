import React from 'react';
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
  const [selectedCard, setSelectedCard] = React.useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleUpdateAvatarClick() {
    setIsUpdateAvatarPopupOpen(!isUpdateAvatarPopupOpen);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(!isAddCardPopupOpen);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsUpdateAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
    <div className="page__container">
          <Header />

          <Main onEditProfile={handleEditProfileClick} onUpdateAvatar={handleUpdateAvatarClick} onAddCard={handleAddCardClick} onCardClick={handleCardClick} />
            
          <Footer />
        </div>

        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input className="popup__input popup__input_name" type="text" name="name" id="name" placeholder="Daria Ovchinnikova" required minLength="2" maxLength="40" />
                <span className="popup__form-error" id="name-error"></span>
                <input className="popup__input popup__input_occupation" type="text" name="about" id="occupation" placeholder="Frontend-developer" required minLength="2" maxLength="200" />
                <span className="popup__form-error" id="occupation-error"></span>
        </PopupWithForm>

        <PopupWithForm name="update-avatar" title="Обновить аватар" isOpen={isUpdateAvatarPopupOpen} onClose={closeAllPopups}>
              <input className="popup__input popup__input_avatar-url" type="url" name="url" id="avatar-url" placeholder="Ссылка на картинку" required />
              <span className="popup__form-error" id="avatar-url-error"></span>
        </PopupWithForm>

        <PopupWithForm name="add-card" title="Новое место" isOpen={isAddCardPopupOpen} onClose={closeAllPopups}>
                <input className="popup__input popup__input_place" type="text" name="name" id="place" placeholder="Название" required minLength="1" maxLength="30" />
                <span className="popup__form-error" id="place-error"></span>
                <input className="popup__input popup__input_link" type="url" name="link" id="link" placeholder="Ссылка на картинку" required />
                <span className="popup__form-error" id="link-error"></span>
        </PopupWithForm>

        <PopupWithImage card={selectedCard} onClose={closeAllPopups}/>

        <PopupWithForm name="delete-card" title="Вы уверены?">
                <h2 className="popup__heading popup__heading_type_small-popup">Вы уверены?</h2>
                <button type="submit" className="popup__save-button popup__save-button_type_small-popup">Да</button>
        </PopupWithForm>

</div>
);
}

export default App;
