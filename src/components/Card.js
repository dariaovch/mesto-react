import React from 'react';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.item)
      }  

    return (
        <li className="cards__item">
            <button className="cards__delete-button" type="button" aria-label="delete"></button>
            <img className="cards__image" alt="Фотография места" src={props.item.link} onClick={handleClick} />
            <div className="cards__name-container">
                  <h2 className="cards__heading">{props.item.name}</h2>
                  <div className="cards__like-container"><button className="cards__like-button" type="button" aria-label="like"></button><p className="cards__like-counter">{props.item.likes.length}</p></div>
            </div>
          </li>
    )
}

export default Card;