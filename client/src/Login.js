import { LoginContext, ThemeContext } from "./App.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    console.log("fetching");
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <div>
      <Link to={"/"}>
        <h1 className="headerItems">Kei Truck Trader</h1>
      </Link>
      {typeof backendData.users === "undefined" ? (
        <p>Loading</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
}
