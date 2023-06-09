import logo from "../img/logo.svg";
import React, { useCallback } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

function Header(props) {
  const {signOut} = props;
  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut])
  return (
    <header className="header">
      <div className="header__block">
        <img className="logo" src={logo} alt="логотип" />
        <Routes>
          <Route
            path="/signup"
            element={
              <NavLink to="/signin" className="header__link">
                Войти
              </NavLink>
            }
          />
          <Route
            path="/signin"
            element={
              <NavLink to="/signup" className="header__link">
                Зарегистрироваться
              </NavLink>
            }
          />
          <Route
            path="/"
            element={
              <div className="header__email">
                <span>{props.email}</span>
                <NavLink to="/signin" onClick={handleSignOut} className="header__link header__signout">Выйти</NavLink>
              </div>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
