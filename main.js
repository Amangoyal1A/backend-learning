const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const {userRouter} = require("./Controllers/userRouter");
const {authRouter} = require("./Controllers/authRouter");
app.use(express.json());
app.use(cookieParser());

//base route
app.use("/users", userRouter);
app.use("/auth", authRouter);
//final route for example localhost:3001/users

app.listen(3001, (req, res) => {
  console.log("app listen");
});
