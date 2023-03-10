const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getAllUsers,
  resetPassword,
  updateAccount,
  getOneUserByToken,
  getOneUserByID,
} = require("../controllers/User.controller");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/resetPassword", resetPassword);
router.post("/updateAccount", updateAccount);
router.post("/getOneUserByToken", getOneUserByToken);
router.get("/:id", getOneUserByID);
router.get("/", getAllUsers);

module.exports = router;
