const User = require("../models/User.model");

const loginUser = async (req, res) => {
  res.json({ mssg: "Login user" });
};

const signupUser = async (req, res) => {
  res.json({ mssg: "Signup user" });
};

const getOneUser = async (req, res) => {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) res.send("Error: " + err);
    else {
      res.json(user);
    }
  });
};

const getAllUsers = async (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) res.send("Error: " + err);
    else {
      res.json(users);
    }
  });
};

module.exports = { loginUser, signupUser, getOneUser, getAllUsers };
