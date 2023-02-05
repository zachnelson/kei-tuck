"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  funds: Number,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.signup = async function (name, email, password) {
  if (!email || !password) {
    throw Error("Email and password are required.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Not a valid email.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough. Try again.");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("That email is already being used.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    funds: 999999,
  });
  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required.");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password does not match");
  }
  return user;
};

module.exports = mongoose.model("User", UserSchema);
