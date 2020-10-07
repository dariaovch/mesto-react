import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupWithImage(props) {
    return (
        <div className={props.isOpen ? `popup popup_type_show-card popup_opened` : `popup popup_type_show-card`}>
            <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="close" onClick={props.onClose}></button>
            <figure className="popup__figure">
                <img className="popup__image" alt="Фотография места" />
                <figcaption className="popup__image-caption"></figcaption>
            </figure>
            </div>
        </div>
    )
}

export default PopupWithImage;