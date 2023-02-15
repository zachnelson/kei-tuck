import { useState } from "react";

export function useDisplayTrucks() {
  const [trucksMessage, setTrucksMessage] = useState(null);
  const [isTrucksLoading, setIsTrucksLoading] = useState(null);

  const getTrucks = async () => {
    setIsTrucksLoading(true);
    setTrucksMessage(null);

    const res = await fetch("/api/truck/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const json = await res.json();
    if (!res.ok) setTrucksMessage(json.error);
    else setTrucksMessage("Found trucks");
    setIsTrucksLoading(false);

    return json;
  };
  return { getTrucks, trucksMessage, isTrucksLoading };
}
