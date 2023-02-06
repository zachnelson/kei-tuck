import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();
export const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  console.log("AuthContext state: ", state);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "login", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
