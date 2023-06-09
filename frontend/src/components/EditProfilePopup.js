import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const { isOpen, onClose } = props;
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  const handleChangeName = React.useCallback((evt) => {
    setName(evt.target.value);
  }, [setName]);

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  React.useEffect(() => {
    setName(currentUser?.name ?? '')
    setDescription(currentUser?.about ?? '');
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="profile"
      button="Сохранить"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="pop-up__form-label">
        <input
          onChange={handleChangeName}
          value={name}
          type="text"
          className="pop-up__input"
          name="name"
          placeholder="Введите ваше имя"
          id="pop-up__name"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="pop-up__span-error pop-up__name-error"></span>
      </label>
      <label className="pop-up__form-label">
        <input
          onChange={handleChangeDescription}
          value={description}
          type="text"
          className="pop-up__input"
          name="profession"
          placeholder="Введите вашу профессию"
          id="pop-up__text"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="pop-up__span-error pop-up__text-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
