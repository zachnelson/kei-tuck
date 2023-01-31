"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TruckSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  color: String,
  vehicleType: String,
  headlights: String,
  price: String,
  for_sale: Boolean,
  image: String,
  owner: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Truck", TruckSchema);
