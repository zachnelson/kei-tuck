import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useGetOneTruck } from "../hooks/useGetOneTruck";
import { useTruckHook } from "../hooks/useTruckHook";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDisplayTrucks } from "../hooks/useDisplayTrucks";
import Header from "./Header";
import "../style/Truck.css";

export default function Truck() {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("id");
  const { getOneTruck } = useGetOneTruck();
  const {
    setTruckPrice,
    setTruckNFS,
    buyTruck,
    truckPriceMessage,
    setTruckPriceMessage,
  } = useTruckHook();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [truck, setTruck] = useState("");
  const [price, setPrice] = useState("");
  const { getTrucks } = useDisplayTrucks();
  const randomTrucks = useRef(null);

  const getTruck = async () => {
    const results = await getOneTruck(id);
    if (results) {
      setTruck(results);
    }
  };

  const getAllTrucks = async () => {
    const results = await getTrucks();
    if (results) {
      let trucksFilter = results.filter((truck) => {
        if (id !== undefined && truck._id === id) return false;
        return true;
      });
      if (randomTrucks.current === null)
        randomTrucks.current = trucksFilter
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
          .map((truck) => {
            return (
              <div
                onClick={() => handleOtherTruckClick(truck._id)}
                className="otherTruckFrame"
                key={"o" + truck._id}
              >
                <img
                  className="otherTruckPic"
                  key={"oi" + truck._id}
                  title={truck.make + " " + truck.model + " " + truck.year}
                  alt={truck.make + " " + truck.model + " " + truck.year}
                  src={truck.image}
                />
              </div>
            );
          });
    }
  };

  useEffect(() => {
    if (id === null) navigate("/");
    getTruck();
    getAllTrucks();
    setTruckPriceMessage("");
  }, [id]);

  function handleOtherTruckClick(id) {
    randomTrucks.current = null;
    navigate("/truck?id=" + id);
  }

  async function handleSetPriceClick() {
    await setTruckPrice(user.token, id, price);
    setPrice("");
    getTruck();
  }

  async function handleNFSClick() {
    await setTruckNFS(user.token, id, price);
    setPrice("");
    getTruck();
  }

  async function handleBuyClick() {
    await buyTruck(user.token, id);
    getTruck();
  }

  return (
    <>
      <Header />
      <div className="truckPageContainer">
        {truck !== "" ? (
          <>
            <div className="truckPageFrame" key={"f" + truck._id}>
              <img
                className="truckPagePic"
                key={"i" + truck._id}
                title={truck.make + " " + truck.model + " " + truck.year}
                alt={truck.make + " " + truck.model + " " + truck.year}
                src={truck.image}
              />
            </div>
            <div className="truckPageDetails">
              <h2>Make: {truck.make}</h2>
              <h2>Model: {truck.model}</h2>
              <h2>Year: {truck.year}</h2>
              <h2>Color: {truck.color}</h2>
              <h2>
                Owner:{" "}
                {truck.ownerId !== undefined ? truck.ownerId.name : "No owner"}
              </h2>
              <h2>
                OwnerId:{" "}
                {truck.ownerId !== undefined ? truck.ownerId._id : "No owner"}
              </h2>
              <h2>
                Price:{" "}
                {truck.price !== "Not for sale"
                  ? "$" + parseFloat(truck.price).toLocaleString("en-US")
                  : truck.price}
              </h2>
              {truck.ownerId !== undefined &&
              user &&
              user.id === truck.ownerId._id ? (
                <div>
                  <input
                    value={price}
                    type="text"
                    id="truckPrice"
                    pattern="[0-9]+"
                    placeholder="Enter dollar amount"
                    onChange={(e) =>
                      setPrice(
                        e.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..*)\./g, "$1")
                      )
                    }
                  ></input>
                  <button
                    className="truckPageButton"
                    onClick={handleSetPriceClick}
                  >
                    Set Price
                  </button>
                  <br></br>
                  <button className="truckPageButton" onClick={handleNFSClick}>
                    Not for sale
                  </button>
                  <div className="tradeMessage">{truckPriceMessage}</div>
                </div>
              ) : (
                <>
                  {truck.price !== "Not for sale" && user && (
                    <div>
                      <button
                        onClick={handleBuyClick}
                        className="truckPageButton"
                      >
                        Buy
                      </button>
                      <div className="tradeMessage">{truckPriceMessage}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
        <div className="otherTruckContainer">
          {randomTrucks.current ? randomTrucks.current : "Loading..."}
        </div>
      </div>
    </>
  );
}
