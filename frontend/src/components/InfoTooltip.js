import React from "react";
import closeBtn from "../img/close-btn.svg";
import closeBtnFull from "../img/768/close-btn.svg";
import error from "../img/err.svg";
import accept from "../img/accept.svg";

export const InfoTooltip = (props) => {
  const { isOpen, onClose, status } = props;
  const text =
    status === "error"
      ? "Что-то пошло не так! Попробуйте ещё раз."
      : "Вы успешно зарегистрировались!";
  const alt = status === "error" ? "ошибка" : "успех";
  const image = status === "error" ? error : accept;
  return (
    <div className={`pop-up ${
      isOpen ? "action_open pop-up_opened" : ""
    }`}>
      <div className="pop-up__block pop-up__tooltip">
        <button type="button" className="pop-up__close-btn" onClick={onClose}>
          <picture>
            <source srcSet={closeBtnFull} media="(min-width: 768px)" />
            <img src={closeBtn} alt="закрыть" />
          </picture>
        </button>
        <img  className="pop-up__tooltip-img" src={image} alt={alt} />
        <h2 className="pop-up__title pop-up__tooltip-title">{text}</h2>
      </div>
    </div>
  );
};
