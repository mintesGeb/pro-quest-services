var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../util/Models").UserModel;
const myUsers =require("../util/UserModel")
const secret = require("../config.json").secret;

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = new myUsers({ ...req.body, password });
    const response =await newUser.save();
    res.json(response);
  } catch (e) {
    next(e);
  }
};
exports.login = async (req, res, next) => {
  try {
    let user = await myUsers.findOne({ email: req.body.email });
    let payload = {
      _id:user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    };
    console.log(payload);
    const match = bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw new Error("invalid password");
    }
    const token = jwt.sign(payload, secret);
    res.json({ succcess: true, token });
  } catch (e) {
    next(e);
  }
};

exports.authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.json({ error: "unauthorized" });
    }
    let enc_token = authHeader.split(" ")[1];
    if (enc_token) {
      const token = jwt.verify(enc_token, secret);
      req.token = token;
      next();
    }
  } catch (e) {
    next(e);
  }
};
exports.authorizeSuperUser = async (req, res, next) => {
  if (req.token.email === "super@user") {
    next();
  } else {
    res.json({ error: "forbidden" });
  }
};
