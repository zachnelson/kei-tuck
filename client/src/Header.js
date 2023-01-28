import "./style/Header.css";
export default function Header({ darkMode, toggleDarkMode }) {
  let icon = darkMode ? "🌞" : "🌙";

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
    </div>
  );
}
