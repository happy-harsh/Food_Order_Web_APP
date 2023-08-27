const express = require("express");
// const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");
const router = express.Router();


const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const seckey = process.env.SK;


// SIGNUP ke liye 
router.post(
  "/api/createusers",
  // express validator
  [
    body("name", "Enter a valid name").isLength({ min: 5 }),
    body("location", "Minimum Length is 5").isLength({ min: 5 }),
    body("email", "Enter Correct Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //validate the request
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }

    
    // destructure the content from the body in each variable
    const { name, location, email, password } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(password,salt);
    const newUser = new UserModel({
      name:name,
      location:location,
      email:email,
      password:securePassword,
    });

    await newUser
      .save()
      .then((user) => {
        // console.log(user);
        res.json(user);
        // console.log(global.Fooditems);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ success: false });
      });
  }
);



// LOGIN ke liye 
router.post(
  "/api/loginuser",
  [
    body("email", "Enter Correct Email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req, res);

    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    }
    
    let email = req.body.email;

    await UserModel.findOne({email})
      .then((userData) => {
        // if userData is empty
        if (!userData) {
          return res
            .status(400)
            .json({ error: "User not Found" });
        }
        // user Data hai so password comparison
        const pwdCompare = bcrypt.compare(req.body.password,userData.password);

        // yeh pasword hai kya db mai 
        if (!pwdCompare) {
          return res
            .status(400)
            .json({ error: "Try Loging with correct password" });
        }else{
          // yeh password hai db mai
          const data = {
            user:{
              id:userData.id
            }
          }
          const authToken = jwt.sign(data,seckey,{expiresIn:10});
          return res.json({ success: true,authToken:authToken });
        }

      })
      .catch((error) => {
        res.status(500).json({ error: "Error fetching users" });
      });
  }
);


module.exports = router;
