import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import UpdateAvatarPopup from './UpdateAvatarPopup.js';
import AddCardPopup from './AddCardPopup.js';
// import DeleteCardPopup from './components/DeleteCardPopup.js';
import PopupWithImage from './PopupWithImage.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { api } from '../utils/Api.js';

function App() {

  //Стейт-переменные конктекста текущего пользователя, карточек и открытия попапов

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '#'
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '#'
  });

  //Получаем из API данные пользователя и карточек
  React.useEffect(() => {
    api.getAllPageData()
       .then((argument) => {
          const [ userData, cardsData ] = argument;

          setCurrentUser(userData);
          setCards(cardsData);
       })
       .catch((err) => {
          console.log(err);
       });
  }, []);


  //Логика открытия и закрытия попапов

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateAvatarClick() {
    setIsUpdateAvatarPopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardClick(item) {
    setIsImagePopupOpen(true);
    setSelectedCard(item);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsUpdateAvatarPopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({
      name: '',
      link: '#'
    });
  }

  //Логика получения данных из форм и их отправка на сервер с дальнейшим обновлением данных на странице

  function handleUpdateUser(formData) {
    api.saveEditedInfo(formData)
       .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
       })
       .catch((err) => {
        console.log(err);
       });
  }

  function handleUpdateAvatar(formData) {
    api.updateAvatar(formData)
       .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
       })
       .catch((err) => {
        console.log(err);
       });
  }

  function handleAddCardSubmit(formData) {
    api.addNewCard(formData)
       .then((newCard) => {
         setCards([newCard, ...cards])
         closeAllPopups();
       })
       .catch((err) => {
        console.log(err);
       });
  }


  // Логика постановки и снятия лайков через запрос к API
  function handleCardLike(item) {
    
    const isLiked = item.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(item._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === item._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });;
  }

  // Логика удаления карточки
  function handleCardDelete(item) {
   
    api.deleteCard(item._id).then(() => {
     const newCards = cards.filter((c) => c._id !== item._id);
     setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />

          <Main onEditProfile={handleEditProfileClick} onUpdateAvatar={handleUpdateAvatarClick} onAddCard={handleAddCardClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
            
          <Footer />
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <UpdateAvatarPopup isOpen={isUpdateAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddCardPopup isOpen={isAddCardPopupOpen} onClose={closeAllPopups} onAddCard={handleAddCardSubmit} />

        <PopupWithImage isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />

        {/* <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onCardDelete={handleCardDelete} onClose={closeAllPopups} /> */}
      
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
