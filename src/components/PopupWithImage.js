import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithImage() {
    return (
        <div className="popup popup_type_show-card">
            <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="close"></button>
            <figure className="popup__figure">
                <img className="popup__image" alt="Фотография места" />
                <figcaption className="popup__image-caption"></figcaption>
            </figure>
            </div>
        </div>
    )
}

export default PopupWithImage;