import "../style/Header.css";
import { Link } from "react-router-dom";
import { useThemeContext } from "../hooks/useThemeContext";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Header() {
  const { darkMode, setDarkMode } = useThemeContext();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let icon = !darkMode ? "🌞" : "🌙";
  document.body.className = darkMode ? "darkMode" : "";

  function handleClick() {
    logout();
  }

  function toggleDarkMode() {
    document.body.className = darkMode ? "darkMode" : "";
    localStorage.setItem("darkMode", !darkMode);
    setDarkMode(!darkMode);
  }

  return (
    <header>
      <div className="headerContainer">
        <Link to="/">
          <h1 className="headerItems">Kei Truck Trader</h1>
        </Link>
        <span className="headerItems links">
          <button
            className="headerItems"
            title="Toggle Dark Mode"
            onClick={toggleDarkMode}
          >
            {icon}
          </button>
          {user === null ? (
            <>
              <Link className="headerItems" to="/login">
                Login
              </Link>
              <Link className="headerItems" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="headerItems">Hello, {user.name}</span>
              <Link className="headerItems" to="/account">
                My Account
              </Link>
              <Link className="headerItems" to="/" onClick={handleClick}>
                Logout
              </Link>
            </>
          )}
        </span>
      </div>
    </header>
  );
}
