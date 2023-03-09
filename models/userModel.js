const emailValidator= require('email-validator')
const mongoose = require("mongoose");
const bcrypt= require("bcrypt")
require('dotenv').config();


mongoose
  .connect(process.env.MONGO_URL)
  .then(function (db) {
    console.log("db is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:function(){
return emailValidator.validate(this.email)
    }
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  confirmpassword: {
    type: String,
    required: true,
    min: 8,
    validate:function(){
      return this.password===this.confirmpassword;
          }
  },
});

//hooks in mongo
userSchema.pre('save',function(){
this.confirmpassword = undefined
})

userSchema.pre('save',async function(){
  let salt = await bcrypt.genSalt()
let bcrypthash = await bcrypt.hash(this.password,salt)
this.password = bcrypthash

})


const userModel = mongoose.model("userModel", userSchema);

async function createUser() {
  let user = {
    name: "aman",
    email: "zoop@gmail.com",
    password: "helloworld",
    confirmpassword: "helloworld",
  };

  try {
    let data = await userModel.create(user);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Call the createUser function to create a new user
// createUser();

module.exports = userModel