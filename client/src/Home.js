import "./style/App.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { useState, useContext } from "react";
import DisplayTrucks from "./DisplayTrucks";
import TruckSelect from "./TruckSelect";
import { ThemeContext } from "./App.js";

export default function Home({ setDarkMode }) {
  let darkMode = useContext(ThemeContext);
  let [model, setModel] = useState("");
  let [color, setColor] = useState("");
  let [year, setYear] = useState("");
  let [type, setType] = useState("");

  function resetFilter() {
    setModel("");
    setColor("");
    setYear("");
    setType("");
  }
  function toggleDarkMode() {
    document.body.className = darkMode ? "darkMode" : "";
    setDarkMode(!darkMode);
  }
  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} />
      <div>
        <TruckSelect dataType={"model"} data={model} func={setModel} />
        <TruckSelect dataType={"color"} data={color} func={setColor} />
        <TruckSelect dataType={"year"} data={year} func={setYear} />
        <TruckSelect dataType={"type"} data={type} func={setType} />
        <button onClick={resetFilter}>Reset filter</button>
      </div>
      <DisplayTrucks model={model} color={color} year={year} type={type} />
      <Footer />
    </>
  );
}
