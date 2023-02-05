const express = require("express");
const router = express.Router();
const {
  getOneTruck,
  getAllTrucks,
} = require("../controllers/Truck.controller");

router.get("/:id", getOneTruck);
router.get("/", getAllTrucks);

module.exports = router;
