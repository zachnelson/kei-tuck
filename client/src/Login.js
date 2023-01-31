import { LoginContext, ThemeContext } from "./App.js";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "./Header.js";

export default function Login({ setDarkMode }) {
  let darkMode = useContext(ThemeContext);
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios.get("/api").then((res) => {
      console.log(res.data);
      setBackendData(res.data);
    });
  }, []);

  function toggleDarkMode() {
    document.body.className = darkMode ? "darkMode" : "";
    setDarkMode(!darkMode);
  }

  return (
    <div>
      <Header toggleDarkMode={toggleDarkMode} />
      {typeof backendData.users === "undefined" ? (
        <p>Loading</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
}
