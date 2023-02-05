const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getAllUsers,
  getOneUser,
} = require("../controllers/User.controller");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/:id", getOneUser);
router.get("/", getAllUsers);

module.exports = router;
