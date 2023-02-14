import Footer from "./Footer";
import Header from "./Header";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/Account.css";
import { useResetPassword } from "../hooks/useResetPassword";
import { useUpdateAccount } from "../hooks/useUpdateAccount";

export default function Account() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { resetPassword, isPasswordLoading, passwordMessage } =
    useResetPassword();
  const { updateAccount, isAccountLoading, accountMessage } =
    useUpdateAccount();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("zach@test.com");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user === null) navigate("/");
  });

  // useEffect(() => {
  //   const getDetails = async () => {
  //     const results = await getAccountDetails(userObj["token"]);
  //     if (results) {
  //       setPassword("");
  //       setPassword2("");
  //     }
  //   };
  // }, []);

  async function handleAccountUpdate(e) {
    e.preventDefault();
    const userObj = JSON.parse(localStorage.getItem("user"));
    const results = await updateAccount(userObj["token"], name, email);
    if (results) {
      setPassword("");
      setPassword2("");
    }
  }

  async function handlePasswordReset(e) {
    e.preventDefault();
    setPasswordError("");
    const userObj = JSON.parse(localStorage.getItem("user"));
    const results = await resetPassword(
      userObj["token"],
      userObj["email"],
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
            <input type="text" id="userName"></input>
            <h3>Email</h3>
            <input type="email" id="userEmail"></input>
            <h3>Available Funds</h3>
            <input type="text" disabled id="userFunds"></input>
            <button
              onClick={(e) => handleAccountUpdate(e)}
              className="saveButton"
            >
              Save
            </button>
            <div className="accountError">{detailsError}</div>
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
      <Footer />
    </>
  );
}
