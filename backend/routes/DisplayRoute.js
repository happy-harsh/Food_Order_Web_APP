const express = require("express");
const router = express.Router();


router.post('/api/food',(req,res)=>{
    try{
        res.send([global.Fooditems,global.FoodCategory]);
    }catch(error){
        res.send("error");
    }
})

module.exports = router;