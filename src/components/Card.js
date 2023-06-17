import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <>
      <div className="card">
        <img
          src={card.link}
          alt={card.name}
          className="card__image"
          onClick={handleClick}
        />
        {isOwn && (
          <button
            type="button"
            className="card__delete"
            onClick={handleCardDelete}
          />
        )}
        <div className="card__item">
          <h2 className="card__paragraph">{card.name}</h2>
          <div className="card__like-container">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleCardLike}
            />
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
