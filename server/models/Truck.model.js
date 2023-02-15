"use strict";
const User = require("./User.model");

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TruckSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: Number,
  color: String,
  vehicleType: String,
  headlights: String,
  price: String,
  image: String,
  ownerId: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

TruckSchema.statics.setTruckPrice = async function (userID, id, price) {
  if (!userID || !id || !price) {
    throw Error("All fields are required.");
  }

  if (isNaN(price) && price !== "Not for sale") {
    throw Error("Enter a valid price");
  }

  const truck = await this.findOne({ _id: id });

  if (!truck) {
    throw Error("Truck not found.");
  }

  if (truck.ownerId != userID) {
    throw Error("User ID does not match owner's ID.");
  }
  truck.price = price;

  const save = await truck.save();
  if (!save) {
    throw Error("Unable to update truck price.");
  }
  return "success";
};

TruckSchema.statics.buyTruck = async function (userID, id) {
  if (!userID || !id) {
    throw Error("All fields are required.");
  }

  const truck = await this.findOne({ _id: id });

  if (!truck) {
    throw Error("Truck not found.");
  }

  if (truck.price === "Not for sale") {
    throw Error("Truck is not for sale.");
  }

  if (truck.ownerId == userID) {
    throw Error("User already owns this truck.");
  }

  const buyer = await User.findOne({ _id: userID });

  if (parseFloat(buyer.funds) < parseFloat(truck.price)) {
    throw Error("User does not have enough funds to make this purchase.");
  }

  if (truck.ownerId !== undefined) {
    const owner = await User.findOne({ _id: truck.ownerId });
    owner.funds = parseFloat(owner.funds) + parseFloat(truck.price);
    const ownerSave = await owner.save();
    if (!ownerSave) {
      throw Error("Unable to update owner's funds");
    }
  }

  buyer.funds = parseFloat(buyer.funds) - parseFloat(truck.price);
  const buyerSave = await buyer.save();
  if (!buyerSave) {
    throw Error("Unable to update buyer's funds");
  }

  truck.ownerId = userID;
  truck.price = "Not for sale";
  const save = await truck.save();
  if (!save) {
    throw Error("Unable to update truck price.");
  }
  return "success";
};

module.exports = mongoose.model("Truck", TruckSchema);
