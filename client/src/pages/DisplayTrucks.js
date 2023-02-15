import Footer from "./Footer.js";
import { useNavigate } from "react-router-dom";

export default function DisplayTrucks({
  id,
  trucks,
  model,
  color,
  year,
  type,
  price,
}) {
  const navigate = useNavigate();
  let trucksFilter = trucks.filter((truck) => {
    if (id !== undefined && truck.ownerId !== id) return false;
    if (!truck.make.includes(model.split(" ")[0])) return false;
    if (!truck.color.includes(color)) return false;
    if (!truck.year.toString().includes(year.toString())) return false;
    if (!truck.vehicleType.includes(type)) return false;
    if (
      (price === "Not for sale" && truck.price !== "Not for sale") ||
      (price === ">1000" && truck.price <= parseFloat(1000) === false) ||
      (price === ">10000" && truck.price <= parseFloat(10000) === false) ||
      (price === "<10001" && truck.price >= parseFloat(10001) === false)
    )
      return false;
    return true;
  });

  console.log(trucksFilter.length);

  function handleTruckClick(id) {
    navigate("/truck?id=" + id);
  }

  return (
    <div className="truckListContainer">
      <div className="truckList">
        {trucksFilter.length > 0 ? (
          trucksFilter.map((truck) => {
            return (
              <div
                onClick={() => handleTruckClick(truck._id)}
                className="truckContainer"
                key={"c" + truck._id}
              >
                <div className="truckFrame" key={"f" + truck._id}>
                  <img
                    className="truckPic"
                    key={"i" + truck._id}
                    title={truck.make + " " + truck.model + " " + truck.year}
                    alt={truck.make + " " + truck.model + " " + truck.year}
                    src={truck.image}
                  />
                  <div className="displayPrice">
                    {truck.price !== "Not for sale"
                      ? "$" + truck.price
                      : truck.price}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div id="noMatch">No matching trucks found</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
