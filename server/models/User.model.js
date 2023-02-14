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
  if (!name || !email || !password) {
    throw Error("All fields are required.");
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
    throw Error("Email not found.");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password does not match.");
  }
  return user;
};

UserSchema.statics.resetPassword = async function (
  id,
  email,
  password,
  password2
) {
  if (!email) {
    throw Error("All fields are required.");
  }

  if (
    password === "" ||
    password2 === "" ||
    password === undefined ||
    password2 === undefined
  ) {
    throw Error("Please fill out both password fields.");
  } else if (password != password2) {
    throw Error("Both passwords must match.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough. Try again.");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email not found.");
  }

  if (user._id.toString().indexOf(id) == -1) {
    throw Error("User token does not match.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  user.password = hash;
  const save = await user.save();
  if (!save) {
    throw Error("Unable to reset password.");
  }

  return "success";
};

UserSchema.statics.updateAccount = async function (id, name, email) {
  if (!email || !name) {
    throw Error("All fields are required.");
  }

  const user = await this.findOne({ _id: id });

  if (!user) {
    throw Error("Account not found.");
  }

  user.name = name;
  user.email = email;

  const save = await user.save();
  if (!save) {
    throw Error("Unable to update account.");
  }

  return "success";
};

module.exports = mongoose.model("User", UserSchema);
