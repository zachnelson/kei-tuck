const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const PORT = 5000;
require("dotenv").config();
const userRoutes = require("./routes/user");
let User = require("./models/User.model");
let Truck = require("./models/Truck.model");

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

//get all users
// app.get("/users", (req, res) => {
//   console.log("getting all users...");
//   User.find({}).exec((err, users) => {
//     if (err) res.send("Error: " + err);
//     else {
//       //console.log(users);
//       res.json(users);
//     }
//   });
// });

app.listen(PORT, () => console.log("Server started on port: " + PORT));
