import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeContextProvider({ children }) {
  let dark = JSON.parse(localStorage.getItem("darkMode"));
  console.log(
    "reading from local storage  " +
      JSON.parse(localStorage.getItem("darkMode"))
  );
  if (dark === null) dark = false;
  const [darkMode, setDarkMode] = useState(dark);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
