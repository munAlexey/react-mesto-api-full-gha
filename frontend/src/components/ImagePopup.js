import React from "react";
import closeBtnFull from "../img/768/close-btn.svg";
import closeBtn from "../img/close-btn.svg";

function ImagePopup(props) {
  return (
    <div
      className={`pop-up pop-up_cards ${
        props.card ? "action_open pop-up_opened" : ""
      }`}
    >
      <div className="pop-up__full-cards">
        <button
          type="button"
          className="pop-up__close-btn"
          onClick={props.onClose}
        >
          <picture>
            <source srcSet={closeBtnFull} media="(min-width: 768px)" />
            <img
              src={closeBtn}
              className="pop-up__card-close-btn"
              alt="закрыть"
            />
          </picture>
        </button>
        <img
          className="pop-up__card-full-img"
          src={props.cardInfo.link}
          alt={props.cardInfo.name}
        />
        <h3 className="pop-up__card-full-title">{props.cardInfo.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
