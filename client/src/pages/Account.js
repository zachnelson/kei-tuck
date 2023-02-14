import Footer from "./Footer";
import Header from "./Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../style/Account.css";
// import "../style/Credentials.css";

export default function Account() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  if (!user) navigate("/");

  function passwordReset() {
    setError2("");
    if (password === "" || password2 === "") {
      setError2("Please fill out both password fields.");
    } else if (password != password2) {
      setError2("Both passwords must match.");
    }
  }

  return (
    <>
      <Header />
      <div className="accountPage">
        <div className="accountContainer">
          <div className="accountDetails">
            <h2>Account Details</h2>
            <h3>Name</h3>
            <input type="text" id="userName"></input>
            <h3>Email</h3>
            <input type="email" id="userEmail"></input>
            <h3>Available Funds</h3>
            <input type="text" disabled id="userFunds"></input>
            <button className="saveButton">Save</button>
            <div className="accountError">{error}</div>
          </div>
          <div className="passwordChange">
            <h2>Password Reset</h2>
            <h3>New Password</h3>
            <input
              type="text"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <h3>Re-type Password</h3>
            <input
              type="text"
              id="newPassword2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></input>
            <button className="passwordButton" onClick={passwordReset}>
              Reset
            </button>
            <span className="accountError accountError2">{error2}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
