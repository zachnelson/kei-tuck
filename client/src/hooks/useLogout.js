import { useAuthContext } from "./useAuthContext";

export function useLogout() {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "logout" });
  };
  return { logout };
}
