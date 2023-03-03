const express = require("express");
const app = express();
const userModel = require("../models/userModel");
const authRouter = express.Router();
const path = require('path')
authRouter
  .route("/signup")
  .get(middleware1, getSignup, middleware2)
  .post(postSignup);

function middleware1(req, res, next) {
  console.log("middleware 1 encountred");
  next();
}

function middleware2(req, res) {
  console.log("middleware 2 encountred");
 res.sendFile(path.join(__dirname, "../Public", "index.html"));


}

function getSignup(req, res, next) {
  console.log("getsignup called");
  next();
}

async function postSignup(req, res) {
  const obj = req.body;
  // console.log("from backend", obj);

  let datafrombackend = await userModel.create(obj);
  console.log(datafrombackend);
  res.json({
    message: "user signed up",
    data: obj,
  });
}

module.exports = authRouter;
