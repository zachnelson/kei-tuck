const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getAllUsers,
  resetPassword,
  getOneUser,
} = require("../controllers/User.controller");
const requireAuth = require("../middleware/requireAuth");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/resetPassword", resetPassword);
router.get("/:id", getOneUser);
router.get("/", requireAuth, getAllUsers);

module.exports = router;
