import React from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js'

function Main(props) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getAllPageData()
           .then((argument) => {
              const [ userData, cardsData ] = argument;

              console.log(cardsData)

              setUserName(userData.name);
              setUserDescription(userData.about);
              setUserAvatar(userData.avatar);
              setCards(cardsData);
           })
           .catch((err) => {
              console.log(err);
           });
    }, []);

    return (
        <main className="content">
                <section className="profile">
                    <div className="profile__info-container">
                        <div className="profile__img-container" onClick={props.onUpdateAvatar}><img className="profile__avatar" alt="Аватар пользователя" src={userAvatar} /></div>
                        <div className="profile__info">
                            <div className="profile__edit-container">
                                <h1 className="profile__name">{userName}</h1>
                                <button className="profile__edit-button" type="button" aria-label="edit" onClick={props.onEditProfile}></button>
                            </div>
                            <p className="profile__occupation">{userDescription}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" aria-label="add" onClick={props.onAddCard}></button>
                </section>

                <section className="cards">
                    <ul className="cards__grid">
                    {cards.map((item) => <Card key={item._id} link={item.link} name={item.name} likes={item.likes} onCardClick={props.handleCardClick} />)}
                    </ul>
                </section>
            </main>
    )
}

export default Main;