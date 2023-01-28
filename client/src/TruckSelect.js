import React, { useState } from "react";

export default function TruckSelect({ dataType, data, func }) {
  const [model] = useState([
    "Suzuki Carry",
    "Mitsubishi Minicab",
    "Honda Acty",
    "Daihatsu Hijet",
    "Subaru Sambar",
    "Mazda Scrum",
  ]);

  const [color] = useState([
    "White",
    "Red",
    "Silver",
    "Green",
    "Yellow",
    "Blue",
    "Camo",
  ]);

  const [year] = useState([
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
  ]);

  const [type] = useState(["Truck", "Van"]);

  let dataSet = "";

  if (dataType === "model") dataSet = model;
  else if (dataType === "color") dataSet = color;
  else if (dataType === "year") dataSet = year;
  else if (dataType === "type") dataSet = type;

  return (
    <select onChange={(e) => func(e.target.value)}>
      <option selected>--Select {dataType}--</option>
      {dataSet &&
        dataSet.map((d, index) => {
          return (
            <option key={index} selected={d === data}>
              {d}
            </option>
          );
        })}
    </select>
  );
}
