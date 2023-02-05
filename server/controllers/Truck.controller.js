const Truck = require("../models/Truck.model");

const getOneTruck = async (req, res) => {
  Truck.findOne({ _id: req.params.id }).exec((err, truck) => {
    if (err) res.send("Error: " + err);
    else {
      res.json(truck);
    }
  });
};

const getAllTrucks = async (req, res) => {
  Truck.find({}).exec((err, trucks) => {
    if (err) res.send("Error: " + err);
    else {
      res.json(trucks);
    }
  });
};

module.exports = { getOneTruck, getAllTrucks };
