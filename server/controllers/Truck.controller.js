const Truck = require("../models/Truck.model");
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log("Verifying token error: " + err);
    } else return decoded;
  });
};

const getOneTruck = async (req, res) => {
  Truck.findOne({ _id: req.params.id })
    .populate("ownerId")
    .exec((err, truck) => {
      if (err) res.send("error: " + err);
      else {
        res.json(truck);
      }
    });
};

const getAllTrucks = async (req, res) => {
  // console.log("getting all trucks");
  Truck.find({}).exec((err, trucks) => {
    if (err) res.send("error: " + err);
    else {
      res.json(trucks);
    }
  });
};

const setTruckPrice = async (req, res) => {
  const { token, id, price } = req.body;
  const userToken = verifyToken(token);
  try {
    const truck = await Truck.setTruckPrice(userToken["_id"], id, price);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setTruckNFS = async (req, res) => {
  const { token, id } = req.body;
  const userToken = verifyToken(token);
  try {
    const truck = await Truck.setTruckPrice(
      userToken["_id"],
      id,
      "Not for sale"
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const buyTruck = async (req, res) => {
  const { token, id } = req.body;
  const userToken = verifyToken(token);
  try {
    const truck = await Truck.buyTruck(userToken["_id"], id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOneTruck,
  getAllTrucks,
  setTruckPrice,
  setTruckNFS,
  buyTruck,
};
