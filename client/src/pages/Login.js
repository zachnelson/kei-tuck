import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../style/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <div className="loginPage">
      {/* <Header /> */}
      <div className="loginPic" />
      <div className="loginForm">
        <form className="login" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br></br>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button disabled={isLoading}>Login</button>
          <div className="error">{error}</div>
        </form>
      </div>
    </div>
  );
}
