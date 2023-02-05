import "../style/Header.css";
import { Link } from "react-router-dom";
import { useThemeContext } from "../hooks/useThemeContext";
import { useLogout } from "../hooks/useLogout";

export default function Header() {
  const { darkMode, setDarkMode } = useThemeContext();
  const { logout } = useLogout();
  let icon = darkMode ? "🌞" : "🌙";

  function handleClick() {
    logout();
  }

  function toggleDarkMode() {
    document.body.className = darkMode ? "darkMode" : "";
    setDarkMode(!darkMode);
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="headerItems">Kei Truck Trader</h1>
        </Link>
        <nav className="header">
          <button
            className="headerItems"
            title="Toggle Dark Mode"
            onClick={toggleDarkMode}
          >
            {icon}
          </button>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>

          <div>
            <Link to="/" onClick={handleClick}>
              Logout
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
