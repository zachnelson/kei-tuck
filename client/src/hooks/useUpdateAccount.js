import { useState } from "react";

export function useUpdateAccount() {
  const [accountMessage, setAccountMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updateAccount = async (token, id, name, email) => {
    setIsLoading(true);
    setAccountMessage(null);

    const res = await fetch("/api/user/resetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, name, email }),
    });

    const json = await res.json();

    if (!res.ok) setAccountMessage(json.error);
    else setAccountMessage("Password reset was successful.");
    setIsLoading(false);

    return res.ok;
  };
  return { updateAccount, isLoading, accountMessage };
}
