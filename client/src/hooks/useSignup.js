import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await res.json();
    if (!res.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (res.ok) {
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "login", payload: json });
    }
  };
  return { signup, isLoading, error };
}
