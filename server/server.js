const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const PORT = 5000;
require("dotenv").config();
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

//get all users
app.get("/users", (req, res) => {
  console.log("getting all users...");
  User.find({}).exec((err, users) => {
    if (err) res.send("Error: " + err);
    else {
      //console.log(users);
      res.json(users);
    }
  });
});

//get one user
app.get("/users/:id", (req, res) => {
  console.log("getting specific user...");
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) res.send("Error: " + err);
    else {
      //console.log(user);
      res.json(user);
    }
  });
});

//create user
app.post("/user/new", (req, res) => {
  console.log(req);
  User.create(req.body, (err, user) => {
    if (err) res.send("Error: " + err);
    else {
      console.log(user);
      res.send(user);
    }
  });
});

app.listen(PORT, () => console.log("Server started on port: " + PORT));
