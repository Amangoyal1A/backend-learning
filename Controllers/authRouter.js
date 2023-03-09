const express = require("express");
require('dotenv').config();
const app = express();
const userModel = require("../models/userModel");
const authRouter = express.Router();
const path = require("path");
const bcrypt = require("bcrypt")
const jwt= require('jsonwebtoken')
//base router in main.js
authRouter
  .route("/signup")
  .get(middleware1, getSignup, middleware2)
  .post(postSignup);

authRouter.route("/login").post(loginUser);

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

async function loginUser(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (user) {
         const isMatch = await bcrypt.compare(password, user.password);
 


        if (isMatch) {
       //JWT 
        let payload = user['_id']
        let JWT_key = "eui34kh54"

        let jwttoken = jwt.sign({payload:payload},JWT_key)
            res.cookie("isLoggedIn", jwttoken, {
                httpOnly: true,
              });  
          return res.status(200).json({
            message: 'User login successful',
            user: user
          });
        } else {
          return res.status(401).json({
            message: 'Invalid email or password'
          });
        }
      } else {
        return res.status(404).json({
          message: 'User not found'
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'An error occurred while logging in'
      });
    }
  }

  module.exports = {
authRouter,
postSignup
  }
  
