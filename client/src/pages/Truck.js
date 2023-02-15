import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetOneTruck } from "../hooks/useGetOneTruck";
import { useTruckHook } from "../hooks/useTruckHook";
import { useAuthContext } from "../hooks/useAuthContext";
import Header from "./Header";
import Footer from "./Footer";
import "../style/Truck.css";

export default function Truck() {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const { getOneTruck, truckMessage, isTruckLoading } = useGetOneTruck();
  const {
    setTruckPrice,
    setTruckNFS,
    buyTruck,
    truckPriceMessage,
    isTruckPriceLoading,
  } = useTruckHook();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const [truck, setTruck] = useState("");
  const [price, setPrice] = useState("");
  const [priceMessage, setPriceMessage] = useState("");

  const getTruck = async () => {
    const results = await getOneTruck(id);
    if (results) {
      setTruck(results);
    }
  };

  useEffect(() => {
    if (id === null) navigate("/");
  }, []);

  useEffect(() => {
    getTruck();
  }, []);

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
                  ? "$" + truck.price
                  : truck.price}
              </h2>
              {truck.ownerId !== undefined && user.id === truck.ownerId._id ? (
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
                  {priceMessage !== "" && (
                    <div className="priceMessage">{priceMessage}</div>
                  )}
                </div>
              ) : (
                <>
                  {truck.price !== "Not for sale" && (
                    <div>
                      <button
                        onClick={handleBuyClick}
                        className="truckPageButton"
                      >
                        Buy
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}
