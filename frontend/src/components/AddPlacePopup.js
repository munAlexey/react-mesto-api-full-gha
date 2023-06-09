import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentCardContext } from "../context/CurrentUserContext";

function AddPlacePopup(props) {
  const { isOpen, onClose } = props;
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const currentCard = React.useContext(CurrentCardContext);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentCard?.name ?? "");
    setLink(currentCard?.about ?? "");
  }, [currentCard, isOpen]);
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="add"
      button="Сохранить"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="pop-up__form-label">
        <input
          onChange={handleChangeName}
          value={name}
          type="text"
          className="pop-up__input"
          name="title"
          placeholder="Название"
          id="pop-up__title"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="pop-up__span-error pop-up__title-error"></span>
      </label>
      <label className="pop-up__form-label">
        <input
          onChange={handleChangeLink}
          value={link}
          type="url"
          className="pop-up__input"
          name="link"
          placeholder="Ссылка на картинку"
          id="pop-up__link"
          required
        />
        <span className="pop-up__span-error pop-up__link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
