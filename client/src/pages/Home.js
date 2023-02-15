import "../style/App.css";
import Header from "./Header.js";
import { useState, useEffect } from "react";
import DisplayTrucks from "./DisplayTrucks";
import TruckSelect from "./TruckSelect";
import Sidebar from "./Sidebar";
import { useDisplayTrucks } from "../hooks/useDisplayTrucks";
import { useParams } from "react-router-dom";

export default function Home() {
  let [model, setModel] = useState("");
  let [color, setColor] = useState("");
  let [year, setYear] = useState("");
  let [type, setType] = useState("");
  let [price, setPrice] = useState("");
  const { getTrucks, trucksMessage, isTrucksLoading } = useDisplayTrucks();
  const { id } = useParams();
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    const getAllTrucks = async () => {
      const results = await getTrucks();
      if (results) {
        setTrucks(results);
      }
    };
    getAllTrucks();
  }, []);

  function resetFilter() {
    setModel("");
    setColor("");
    setYear("");
    setType("");
    setPrice("");
  }
  return (
    <div className="body">
      <Header />
      <Sidebar>
        <TruckSelect dataType={"model"} data={model} func={setModel} />
        <TruckSelect dataType={"color"} data={color} func={setColor} />
        <TruckSelect dataType={"year"} data={year} func={setYear} />
        <TruckSelect dataType={"type"} data={type} func={setType} />
        <TruckSelect dataType={"price"} data={price} func={setPrice} />
        <button className="redButton" onClick={resetFilter}>
          Reset filter
        </button>
      </Sidebar>
      {trucks.length !== 0 && (
        <DisplayTrucks
          id={id}
          trucks={trucks}
          model={model}
          color={color}
          year={year}
          type={type}
          price={price}
        />
      )}
    </div>
  );
}
