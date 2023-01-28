import "./style/App.css";
import { useState } from "react";
import Home from "./Home";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";

export default function App() {
  let [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
