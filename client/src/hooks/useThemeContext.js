import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw Error("useThemeContext must be used within the ThemeContextProvider");
  }
  return context;
}
