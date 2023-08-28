const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const UserModel = require("./models/UserModel");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();


const port = process.env.PORT;
const uri = process.env.URI;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const CreateRoute = require("./routes/CreateUser")
const DisplayRoute = require("./routes/DisplayRoute")
const OrderRoute = require("./routes/OrderData")
app.use(CreateRoute);
app.use(DisplayRoute);
app.use(OrderRoute);
// This is the old way to do it 
// app.post('/getUsers', async (req, res) => {
//     const user = req.body
//     const newUser = new UserModel(user)
//     await newUser.save()
//       .then((user) => {
//         res.json(user);
//       })
//       .catch((error) => {
//         res.status(500).json({ error: 'Error creating user' });
//       });
//   });


// My DATABASE 
mongoose.connect(uri).then(async ()=>{
  console.log("connected to mongodb");
  const fetchData = await mongoose.connection.db.collection("Fooditems"); 
  fetchData.find({}).toArray().then((data)=>{
    const foodCategory = mongoose.connection.db.collection("FoodCategory");
    foodCategory.find({}).toArray().then((catData)=>{

      global.Fooditems = data;
      global.FoodCategory = catData;
    }).catch(()=>{
      console.log("Inside food error")
    })
  }).catch(()=>{
    console.log("outside error");
  })



}).catch((err)=>{
  console.log("error in connecting",err);
});


// SERVER status
app.listen(port, () => {
  console.log("------------------------------------");
  console.log("Server is running perfectfully");
  console.log("------------------------------------");
});