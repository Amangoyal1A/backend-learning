const express = require("express");
const app = express();
const jwt= require('jsonwebtoken')
const userModel = require("../models/userModel");
const cookieParser = require("cookie-parser");
const userRouter = express.Router();
app.use(cookieParser());
userRouter
  .route("/")
  .get(protectRoute,getUser)
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser);

//cookies
userRouter.route("/getcookies").get(getCookies);

userRouter.route("/setcookies").get(setCookies);

//final route for example localhost:3001/users/1
userRouter.route("/:id").get(getuserbyid);

const users = [
  { name: "Aarav", id: 1, age: 22 },
  { name: "Diya", id: 2, age: 27 },
  { name: "Kavya", id: 3, age: 19 },
  { name: "Rahul", id: 4, age: 31 },
  { name: "Shreya", id: 5, age: 25 },
];

async function getUser(req, res) {
  // console.log(req.query);
res.send(users);
//   let data = await userModel.find({ email: "zoop@gmail.com" });
//   res.json({ message: "users", userdata: data });
}
function postUser(req, res) {
  console.log(req.body);
  res.json({
    message: "data recieved",
    users: req.body,
  });
}

function updateUser(req, res) {
  console.log(req.body);
  let datatobeupdated = req.body;
  // using static
  // for (key in datatobeupdated) {
  //   users[key] = datatobeupdated[key];
  // }

  // using mongodb

  userModel
    .findOneAndUpdate({ email: "zoop@gmail.com" }, datatobeupdated)
    .exec((err, user) => {
      if (err) {
        res.json({
          message: "Error updating user data",
          error: err,
        });
      } else {
        res.json({
          message: "User data updated successfully",
          user: user,
        });
      }
    });
}

function deleteUser(req, res) {
  users = {};
}

function getuserbyid(req, res) {
  //we use parseInt because req.params.id always return string
  const ids = parseInt(req.params.id);
  let p = "";
  users.filter((curr) => {
    if (curr.id === ids) {
      p = curr.name;
    }
  });
  //if want recieve the name of current id
  console.log(p);
  //if want to recieve the name of other student expcept curr id name
  //   const ids = parseInt(req.params.id);
  //   const otherNames = users
  //     .filter(user => user.id !== ids)
  //     .map(user => user.name);

  //   console.log(otherNames);

  res.json({
    message: "user in console",
    userid: req.params.id,
  });
}

function getCookies(req, res) {}

function setCookies(req, res) {
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.send("cookie set ");
}

function protectRoute(req, res, next) {
    const JWT_key = "eui34kh54";
    const token = req.cookies.isLoggedIn;
  
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, JWT_key);
      req.user = decoded; // Store the decoded user object in the request object for future use
      next();
    } catch (ex) {
      return res.status(400).json({ message: "Invalid token." });
    }
  }
  


  module.exports = {
    userRouter,
    getUser
  }
  