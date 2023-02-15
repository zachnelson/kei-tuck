import Footer from "./Footer";
import Header from "./Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import "../style/Account.css";
import { useResetPassword } from "../hooks/useResetPassword";
import { useUpdateAccount } from "../hooks/useUpdateAccount";

export default function Account() {
  const { user } = useAuthContext();
  const { resetPassword, isPasswordLoading, passwordMessage } =
    useResetPassword();
  const { updateAccount, getUserByToken, isAccountLoading, accountMessage } =
    useUpdateAccount();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [funds, setFunds] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      const results = await getUserByToken(user.token);
      if (results) {
        setName(results.name);
        setEmail(results.email);
        setFunds(results.funds);
      }
    };
    getDetails();
  }, []);

  async function handleAccountUpdate(e) {
    e.preventDefault();
    const results = await updateAccount(user.token, name, email);
    if (results) user.name = name;
  }

  async function handlePasswordReset(e) {
    e.preventDefault();
    const results = await resetPassword(
      user.token,
      user.email,
      password,
      password2
    );
    if (results) {
      setPassword("");
      setPassword2("");
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
            <input
              type="text"
              id="userName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <h3>Email</h3>
            <input
              type="email"
              id="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <h3>Available Funds</h3>
            <input type="text" value={funds} disabled id="userFunds"></input>
            <button
              disabled={isAccountLoading}
              onClick={(e) => handleAccountUpdate(e)}
              className="saveButton"
            >
              Save
            </button>
            <div className="accountError">{accountMessage}</div>
          </div>
          <div className="passwordChange">
            <h2>Password Reset</h2>
            <h3>New Password</h3>
            <input
              type="password"
              id="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <h3>Re-type Password</h3>
            <input
              type="password"
              id="newPassword2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            ></input>
            <button
              className="passwordButton"
              disabled={isPasswordLoading}
              onClick={(e) => handlePasswordReset(e)}
            >
              Reset
            </button>
            <span className="accountError accountError2">
              {passwordMessage}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
