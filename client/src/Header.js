import "./style/Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext, ThemeContext } from "./App.js";

export default function Header({ toggleDarkMode }) {
  let darkMode = useContext(ThemeContext);
  let { login, setLogin } = useContext(LoginContext);
  let icon = darkMode ? "🌞" : "🌙";

  function handleLoginClick() {
    if (login === null) setLogin(true);
    else setLogin(null);
  }

  return (
    <div className="header">
      <h1 className="headerItems">Kei Truck Trader</h1>
      <button
        className="headerItems"
        title="Toggle Dark Mode"
        onClick={toggleDarkMode}
      >
        {icon}
      </button>
      {login === null ? (
        <Link to={"/login"} onClick={handleLoginClick}>
          Login
        </Link>
      ) : (
        <Link to={"/"} onClick={handleLoginClick}>
          Logout
        </Link>
      )}
    </div>
  );
}
