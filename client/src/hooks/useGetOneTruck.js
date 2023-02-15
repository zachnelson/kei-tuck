import { useState } from "react";

export function useGetOneTruck() {
  const [truckMessage, setTruckMessage] = useState(null);
  const [isTruckLoading, setIsTruckLoading] = useState(null);

  const getOneTruck = async (id) => {
    setIsTruckLoading(true);
    setTruckMessage(null);

    const res = await fetch("/api/truck/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    if (!res.ok) setTruckMessage(json.error);
    else setTruckMessage("Found trucks");
    setIsTruckLoading(false);

    return json;
  };
  return { getOneTruck, truckMessage, isTruckLoading };
}
