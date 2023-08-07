import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import trashImage from "../images/Trash.svg";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  if(card.data){
    card = card.data;
  }
  let currentUser = useContext(CurrentUserContext);
  if(currentUser.data){
    currentUser = currentUser.data;
  }
  const isOwn = card.owner === currentUser._id;
  let isLiked = false;
  isLiked = card.likes.some((i) => i._id === currentUser._id);
  const id = card._id;
  console.log(id);
  const likes = card.likes;
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;
  function handleClick() {
    onCardClick({ card });
  }
  function handleLikeClick() {
    onCardLike({ likes, id });
  }
  function handleDeleteClick() {
    onCardDelete({ id });
  }

  return (
    <div className="element">
      <button
        aria-label="открыть просмотр фото"
        type="button"
        className="element__open"
        onClick={handleClick}
      >
        <img className="element__image" src={card.link} alt={card.name} />
      </button>
      {isOwn && (
        <button
          type="button"
          className="element__trash"
          onClick={handleDeleteClick}
        >
          <img src={trashImage} alt="урна" />
        </button>
      )}
      <div className="element__description">
        <h2 className="element__caption">{card.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
