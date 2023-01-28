import trucks from "./data/trucks.json";
import "./style/DisplayTrucks.css";

export default function DisplayTrucks({ model, color, year, type }) {
  let trucksFilter = trucks.filter((truck) => {
    if (!truck.make.includes(model.split(" ")[0])) return false;
    if (!truck.color.includes(color)) return false;
    if (!truck.year.includes(year)) return false;
    if (!truck.vehicleType.includes(type)) return false;
    return true;
  });

  return (
    <>
      {trucksFilter.length > 0 ? (
        trucksFilter.map((truck) => {
          return (
            <div className="truckContainer" key={"c" + truck.id}>
              <div className="truckFrame" key={"f" + truck.id}>
                <img
                  className="truckPic"
                  key={"i" + truck.id}
                  title={truck.make + " " + truck.model + " " + truck.year}
                  alt={truck.make + " " + truck.model + " " + truck.year}
                  src={truck.image}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div id="noMatch">No matching trucks found</div>
      )}
    </>
  );
}
