import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.item.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `${isOwn ? 'cards__delete-button cards__delete-button_visible' : 'cards__delete-button'}`
  );

  const isLiked = props.item.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `${isLiked ? 'cards__like-button cards__like-button_active' : 'cards__like-button'}`
  );

    function handleClick() {
        props.onCardClick(props.item)
      }  

    function handleLikeClick() {
      props.onCardLike(props.item)
    }

    function handleDeleteClick() {
      props.onCardDelete(props.item)
    }

    return (
        <li className="cards__item">
            <button className={cardDeleteButtonClassName} type="button" aria-label="delete" onClick={handleDeleteClick}></button>
            <img className="cards__image" alt="Фотография места" src={props.item.link} onClick={handleClick} />
            <div className="cards__name-container">
                  <h2 className="cards__heading">{props.item.name}</h2>
                <div className="cards__like-container"><button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick}></button><p className="cards__like-counter">{props.item.likes.length}</p></div>
            </div>
          </li>
    )
}

export default Card;