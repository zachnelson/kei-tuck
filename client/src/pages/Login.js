import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import "../style/Credentials.css";

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
      <img
        className="bigPic"
        src="https://www.motortrend.com/uploads/sites/11/2019/09/Suzuki-Carry-Roundcat-Racing-11.jpg"
        alt="cool red truck"
      />
      <div className="loginForm">
        <form className="login" onSubmit={handleSubmit}>
          <div>
            <Link to="/">
              <h2>Mini Truck</h2>
            </Link>
          </div>
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
          <button className="redButton" disabled={isLoading}>
            Login
          </button>
          <div className="error">{error}</div>
          <br />
          <br />
          <div className="altLink">
            Don't have an account? <br></br>Create one{" "}
            <Link to="/signup">here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
