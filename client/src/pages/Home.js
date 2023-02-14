import "../style/App.css";
import Header from "./Header.js";
import { useState } from "react";
import DisplayTrucks from "./DisplayTrucks";
import TruckSelect from "./TruckSelect";
import Sidebar from "./Sidebar";

export default function Home() {
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
  return (
    <div className="body">
      <Header />
      <Sidebar>
        <TruckSelect dataType={"model"} data={model} func={setModel} />
        <TruckSelect dataType={"color"} data={color} func={setColor} />
        <TruckSelect dataType={"year"} data={year} func={setYear} />
        <TruckSelect dataType={"type"} data={type} func={setType} />
        <button className="redButton" onClick={resetFilter}>
          Reset filter
        </button>
      </Sidebar>
      <DisplayTrucks model={model} color={color} year={year} type={type} />
    </div>
  );
}
