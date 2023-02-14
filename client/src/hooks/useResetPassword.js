import { useState } from "react";

export function useResetPassword() {
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(null);

  const resetPassword = async (token, email, password, password2) => {
    setIsPasswordLoading(true);
    setPasswordMessage(null);

    const res = await fetch("/api/user/resetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, password, password2 }),
    });

    const json = await res.json();

    if (!res.ok) setPasswordMessage(json.error);
    else setPasswordMessage("Password reset was successful.");
    setIsPasswordLoading(false);

    return res.ok;
  };
  return { resetPassword, isPasswordLoading, passwordMessage };
}
