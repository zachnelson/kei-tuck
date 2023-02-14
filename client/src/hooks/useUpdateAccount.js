import { useState } from "react";

export function useUpdateAccount() {
  const [accountMessage, setAccountMessage] = useState(null);
  const [isAccountLoading, setIsAccountLoading] = useState(null);

  const updateAccount = async (token, name, email) => {
    setIsAccountLoading(true);
    setAccountMessage(null);

    const res = await fetch("/api/user/updateAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, name, email }),
    });

    const json = await res.json();

    if (!res.ok) setAccountMessage(json.error);
    else setAccountMessage("Account update was successful.");
    setIsAccountLoading(false);

    return res.ok;
  };

  const getUserByToken = async (token) => {
    const res = await fetch("/api/user/getOneUserByToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return res.json();
  };
  return { updateAccount, getUserByToken, isAccountLoading, accountMessage };
}
