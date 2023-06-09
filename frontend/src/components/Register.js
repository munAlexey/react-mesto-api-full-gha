import React, { useCallback } from "react";
import { CurrentCardContext } from "../context/CurrentUserContext";

export default function Register(props) {
  const { onSubmit} = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const currentCard = React.useContext(CurrentCardContext);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const formData = ({
      email,
      password,
    });
    onSubmit(formData);
    
  }, [email, password, onSubmit]);
  function handleChangeName(evt) {
    setEmail(evt.target.value);
  }

  function handleChangeLink(evt) {
    setPassword(evt.target.value);
  }

  React.useEffect(() => {
    setEmail(currentCard?.name ?? "");
    setPassword(currentCard?.about ?? "");
  }, [currentCard]);
  return (
    <div className="auth__block">
      <h2 className="auth__title">{props.title}</h2>
      <form
        onSubmit={handleSubmit}
        className="auth__form"
        name={`form-${email}`}
      >
        <label className="pop-up__form-label">
          <input
            onChange={handleChangeName}
            value={email}
            type="text"
            className="pop-up__input auth__input"
            name="title"
            placeholder="Email"
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
            value={password}
            type="password"
            className="pop-up__input auth__input"
            name="link"
            placeholder="Пароль"
            id="pop-up__link"
            required
          />
          <span className="pop-up__span-error pop-up__link-error"></span>
        </label>
        <button type="submit" className="auth__button">
          {props.button}
        </button>
        {props.child}
      </form>
    </div>
  );
}
