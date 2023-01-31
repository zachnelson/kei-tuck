import "./style/App.css";
import { useState, createContext } from "react";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import Account from "./Account";
import { Routes, Route } from "react-router-dom";

export const LoginContext = createContext(null);
export const ThemeContext = createContext(null);

export default function App() {
  let [darkMode, setDarkMode] = useState(true);
  let [login, setLogin] = useState(null);

  return (
    <>
      <LoginContext.Provider value={{ login, setLogin }}>
        <ThemeContext.Provider value={darkMode}>
          <Routes>
            <Route path="/" element={<Home setDarkMode={setDarkMode} />} />
            <Route
              path="/login"
              element={<Login setDarkMode={setDarkMode} />}
            />
            <Route
              path="/account"
              element={<Account setDarkMode={setDarkMode} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeContext.Provider>
      </LoginContext.Provider>
    </>
  );
}
