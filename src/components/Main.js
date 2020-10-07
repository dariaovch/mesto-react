import React from 'react';

function Main(props) {
    return (
        <main className="content">
                <section className="profile">
                    <div className="profile__info-container">
                        <div className="profile__img-container" onClick={props.onUpdateAvatar}><img className="profile__avatar" alt="Аватар пользователя" /></div>
                        <div className="profile__info">
                            <div className="profile__edit-container">
                                <h1 className="profile__name"></h1>
                                <button className="profile__edit-button" type="button" aria-label="edit" onClick={props.onEditProfile}></button>
                            </div>
                            <p className="profile__occupation"></p>
                        </div>
                    </div>
                    <button className="profile__add-button" type="button" aria-label="add" onClick={props.onAddCard}></button>
                </section>

                <section className="cards">
                    <ul className="cards__grid">
                    
                    </ul>
                </section>
            </main>
    )
}

export default Main;