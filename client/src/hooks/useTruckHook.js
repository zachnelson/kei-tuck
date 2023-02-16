import { useState } from "react";

export function useTruckHook() {
  const [truckPriceMessage, setTruckPriceMessage] = useState(null);
  const [isTruckPriceLoading, setIsTruckPriceLoading] = useState(null);

  const setTruckPrice = async (token, id, price) => {
    setIsTruckPriceLoading(true);
    setTruckPriceMessage(null);

    const res = await fetch("/api/truck/price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, id, price }),
    });

    const json = await res.json();
    if (!res.ok) setTruckPriceMessage(json.error);
    else setTruckPriceMessage("Price updated successfully");
    setIsTruckPriceLoading(false);

    return json;
  };

  const setTruckNFS = async (token, id) => {
    setIsTruckPriceLoading(true);
    setTruckPriceMessage(null);

    const res = await fetch("/api/truck/nfs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, id }),
    });

    const json = await res.json();
    if (!res.ok) setTruckPriceMessage(json.error);
    else setTruckPriceMessage("Marked as not for sale");
    setIsTruckPriceLoading(false);

    return json;
  };

  const buyTruck = async (token, id) => {
    setIsTruckPriceLoading(true);
    setTruckPriceMessage(null);

    const res = await fetch("/api/truck/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, id }),
    });

    const json = await res.json();
    if (!res.ok) setTruckPriceMessage(json.error);
    else setTruckPriceMessage("Purchase was successful");
    setIsTruckPriceLoading(false);

    return json;
  };
  return {
    setTruckPrice,
    setTruckNFS,
    buyTruck,
    truckPriceMessage,
    setTruckPriceMessage,
    isTruckPriceLoading,
  };
}
