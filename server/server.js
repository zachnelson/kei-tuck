const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const PORT = 5000;
const userRoutes = require("./routes/user");
const truckRoutes = require("./routes/truck");

const uri =
  "mongodb+srv://" +
  process.env.DB_USER_ID +
  ":" +
  process.env.DB_USER_KEY +
  "@cluster0.hewaxyr.mongodb.net/KeiTruckTrader?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb");
  } catch (err) {
    console.error(err);
  }
}
connect();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/truck", truckRoutes);

app.listen(PORT, () => console.log("Server started on port: " + PORT));
