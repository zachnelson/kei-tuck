import { useState } from "react";
import Header from "./Header";
import { useSignup } from "../hooks/useSignup";

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
    <>
      <Header />
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Signup</h3>
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading}>Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}
