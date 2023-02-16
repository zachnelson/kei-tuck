const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log("Verifying token error: " + err);
    } else return decoded;
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const name = user.name;
    const id = user._id;
    const funds = user.funds;
    res.status(200).json({ email, name, id, funds, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token, email, password, password2 } = req.body;
  const id = verifyToken(token);
  try {
    const user = await User.resetPassword(
      id["_id"],
      email,
      password,
      password2
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAccount = async (req, res) => {
  const { token, name, email } = req.body;
  const id = verifyToken(token);
  try {
    const user = await User.updateAccount(id["_id"], name, email);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneUserByID = async (req, res) => {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) res.send("error: " + err);
    else {
      res.json(user);
    }
  });
};

const getOneUserByToken = async (req, res) => {
  const { token } = req.body;
  const id = verifyToken(token);
  User.findOne({ _id: id }, { password: 0, _id: 0 }).exec((err, user) => {
    if (err) res.send("error: " + err);
    else {
      res.json(user);
    }
  });
};

const getAllUsers = async (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) res.send("error: " + err);
    else {
      res.json(users);
    }
  });
};

module.exports = {
  loginUser,
  signupUser,
  resetPassword,
  updateAccount,
  getOneUserByToken,
  getOneUserByID,
  getAllUsers,
};
