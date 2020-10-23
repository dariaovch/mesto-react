import React from 'react';
import './index.css';
import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import EditProfilePopup from './components/EditProfilePopup.js';
import UpdateAvatarPopup from './components/UpdateAvatarPopup.js';
import AddCardPopup from './components/AddCardPopup.js';
// import DeleteCardPopup from './components/DeleteCardPopup.js';
import PopupWithImage from './components/PopupWithImage.js';
import { CurrentUserContext } from './contexts/CurrentUserContext.js';
import { api } from './utils/Api.js';

function App() {

  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '#'
  });
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isUpdateAvatarPopupOpen, setIsUpdateAvatarPopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

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

  function handleUpdateUser(formData) {
    api.saveEditedInfo(formData)
       .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
       })
  }

  function handleUpdateAvatar(formData) {
    api.updateAvatar(formData)
       .then((data) => {
         setCurrentUser(data);
         closeAllPopups();
       })
  }

  function handleAddCardSubmit(formData) {
    api.addNewCard(formData)
       .then((newCard) => {
         setCards([newCard, ...cards])
         closeAllPopups();
       })
  }


  function handleCardLike(item) {

    const isLiked = item.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(item._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === item._id ? newCard : c);
      setCards(newCards);
    });
}

  function handleCardDelete(item) {
   
    api.deleteCard(item._id).then(() => {
     const newCards = cards.filter((c) => c._id !== item._id);
     setCards(newCards);
    });
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

        <PopupWithImage card={selectedCard} onClose={closeAllPopups} />

        {/* <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onCardDelete={handleCardDelete} onClose={closeAllPopups} /> */}
      
</div>
</CurrentUserContext.Provider>
);
}

export default App;
