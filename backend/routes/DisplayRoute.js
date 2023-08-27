const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

router.post('/api/food',(req,res)=>{
    try{
        res.send([global.Fooditems,global.FoodCategory]);
    }catch(error){
        res.send("error");
    }
})

router.get('/api/users', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });







module.exports = router;