import { useState } from "react";
import "../style/Credentials.css";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(name, email, password);
  }
  return (
    <div className="signupPage">
      <div className="bigPic" />
      <div className="signupForm">
        <form className="signup" onSubmit={handleSubmit}>
          <div>
            <Link to="/">
              <h2>Kei Truck Trader</h2>
            </Link>
          </div>
          <h3>Signup</h3>
          <input
            type="text"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button className="redButton" disabled={isLoading}>
            Submit
          </button>
          <div className="error">{error}</div>
          <br />
          <br />
          <div className="altLink">
            Already have an account? Login <Link to="/login">here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
