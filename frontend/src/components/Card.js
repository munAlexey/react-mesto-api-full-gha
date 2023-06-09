import React from "react";
import BusketDeleteBtn from "../img/delete.svg";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_state_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button className="card__delete" onClick={handleDeleteClick}>
          <img
            className="card__delete-img"
            src={BusketDeleteBtn}
            alt="удалить"
          />
        </button>
      )}
      <picture>
        <source media="(min-width: 1280px)" />
        <source media="(min-width: 768px)" />
        <img
          className="card__img"
          src={props.link}
          alt={props.name}
          onClick={handleClick}
        />
      </picture>
      <div className="card__text-block">
        <h3 className="card__title">{props.name}</h3>
        <div className="card__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
