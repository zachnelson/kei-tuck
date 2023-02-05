import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Header from "./Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();

    await login(email, password);
  }

  return (
    <>
      <Header />
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
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
        <button disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
}
