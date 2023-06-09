import React, { useCallback, useEffect } from "react";
import Header from "./Header";
import "../index.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
import Login from "./Login";
import Register from "./Register";
import { NavLink } from "react-router-dom";
import { ProtectRoute } from "./ProtectedRoute";
import { checkAuth, login, signup } from "../utils/Auth";
import { InfoTooltip } from "./InfoTooltip";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [email, setEmail] = React.useState("your@mail.ru");
  const [registerTooltip, setRegisterTooltip] = React.useState(false);
  const [registerStatus, setRegisterStatus] = React.useState("");
  const navigate = useNavigate();
  const handleTooltipClose = useCallback(() => {
    setRegisterTooltip(false);
    setRegisterStatus("");
  }, []);

  const handleSignUp = useCallback(
    async (data) => {
      try {
        await signup(data);
        setRegisterTooltip(true);
        setRegisterStatus("success");
        navigate("/signin ");
      } catch (err) {
        setRegisterTooltip(true);
        setRegisterStatus("error");
      }
    },
    [navigate]
  );
  const handleSignOut = useCallback(() => {
    localStorage.removeItem("jwt");
    navigate("/signin");
    setIsLoggedIn(false);
  }, [navigate]);

  const handleSignIn = useCallback(
    async (data) => {
      try {
        const { token } = await login(data);
        localStorage.setItem("jwt", token);
        navigate("/");
        setIsLoggedIn(true);
      } catch (err) {
        setRegisterTooltip(true);
        setRegisterStatus("error");
      }
    },
    [navigate]
  );

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      checkAuth(jwt).then((res) => {
        setEmail(res.data.email);
        setIsLoggedIn(true);
        navigate("/");
      }).catch(err => {
        console.log(err)
      });
    }
  }, [navigate]);

  return (
    <div className="App">
      <div className="page">
        <Header email={email} signOut={handleSignOut} />
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                onSubmit={handleSignUp}
                title="Регистрация"
                button="Зарегистрироваться"
                child={
                  <NavLink to="/signin" className="auth__switch">
                    Уже зарегистрированы? Войти
                  </NavLink>
                }
              />
            }
            button="Войти"
          />
          <Route
            path="/signin"
            element={
              <Login onSubmit={handleSignIn} title="Вход" button="Войти" />
            }
          />
          <Route element={<ProtectRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<Homepage />} />
          </Route>
        </Routes>
        <InfoTooltip
          isOpen={registerTooltip}
          onClose={handleTooltipClose}
          status={registerStatus}
        />
      </div>
    </div>
  );
}

export default App;
