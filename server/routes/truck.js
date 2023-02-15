const express = require("express");
const router = express.Router();
const {
  getOneTruck,
  getAllTrucks,
  setTruckPrice,
  setTruckNFS,
  buyTruck,
} = require("../controllers/Truck.controller");

router.get("/:id", getOneTruck);
router.post("/price", setTruckPrice);
router.post("/nfs", setTruckNFS);
router.post("/buy", buyTruck);
router.get("/", getAllTrucks);

module.exports = router;
