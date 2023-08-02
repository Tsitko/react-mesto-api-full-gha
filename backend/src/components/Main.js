import Card from "./Card";
import React, { useContext, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const cardsElements = cards.map((card) => ({ card: card, key: card._id }));
  const currentUser = useContext(CurrentUserContext);
  const [isOnImage, setIsOnImage] = useState(false);

  function handleOnImageMove() {
    setIsOnImage(true);
  }
  function handleOnImageOut() {
    setIsOnImage(false);
  }
  return (
    <main>
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="аватар"
            className="profile__image"
            onMouseMove={handleOnImageMove}
          />
          <div
            alt="редактировать"
            className={
              isOnImage ? "profile__overlay_active" : "profile__overlay"
            }
            onMouseOut={handleOnImageOut}
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              aria-label="редактирование профиля"
              type="button"
              className="profile__edit"
              name="editProfile"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__caption">{currentUser.about}</p>
        </div>
        <button
          aria-label="добавление фото"
          type="button"
          className="profile__add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photo-grid">
        {cardsElements.map((item) => (
          <Card
            card={item.card}
            key={item.key}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
