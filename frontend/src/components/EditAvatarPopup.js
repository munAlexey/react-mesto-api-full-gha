import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose } = props;
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="profile-edit"
      button="Сохранить"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label className="pop-up__form-label">
        <input
          ref={inputRef}
          type="url"
          className="pop-up__input"
          name="link"
          placeholder="Ссылка на Аватарку"
          id="pop-up__link-ava"
          required
        />
        <span className="pop-up__span-error pop-up__link-ava-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
