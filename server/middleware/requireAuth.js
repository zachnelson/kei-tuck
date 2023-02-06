const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

async function requireAuth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization is required." });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Request not authorized." });
  }
}

module.exports = requireAuth;
