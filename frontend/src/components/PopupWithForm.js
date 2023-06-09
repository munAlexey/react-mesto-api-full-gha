import React from "react";
import closeBtn from "../img/close-btn.svg";
import closeBtnFull from "../img/768/close-btn.svg";

function PopupWithForm(props) {
  const { children, title, name, isOpen, onClose, button, onSubmit } = props;

  return (
    <div
      className={`pop-up pop-up_${name} ${
        isOpen ? "action_open pop-up_opened" : ""
      }`}
    >
      <div className="pop-up__block">
        <button type="button" className="pop-up__close-btn" onClick={onClose}>
          <picture>
            <source srcSet={closeBtnFull} media="(min-width: 768px)" />
            <img src={closeBtn} alt="закрыть" />
          </picture>
        </button>
        <h2 className="pop-up__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className={`pop-up__form pop-up__form-${name}`}
          name={`form-${name}`}
        >
          {children}
          <button
            type="submit"
            className={`pop-up__button pop-up__${name}-btn`}
          >
            {button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
