import { useState } from "react";
import "../style/Credentials.css";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await signup(name, email, password);
    if (user) navigate("/");
  }
  return (
    <div className="signupPage">
      <img
        className="bigPic"
        src="https://www.motortrend.com/uploads/sites/11/2019/09/Suzuki-Carry-Roundcat-Racing-11.jpg"
        alt="cool red truck"
      />
      <div className="signupForm">
        <form className="signup" onSubmit={handleSubmit}>
          <div>
            <Link to="/">
              <h2>Mini Truck</h2>
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
