const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.post("/api/orderData",async (req,res)=>{
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date})
    let eId = await Order.findOne({"email":req.body.email});

    if(eId === null){
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data],

            }).then(()=>{
                res.json({success:true})
            }).catch((error)=>{
                res.json(error.message)
            })
        }catch(error){
            res.send("server error")
        }
    }else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}}).then(()=>{
                res.json({success:true})
            })
        }catch(error){
            res.send(error.message)
        }
    }
})

router.get('/api/user', async (req, res) => {
    const userEmail = req.query.email;
    try {
        const user = await Order.findOne({ email: userEmail }).exec();
        
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
  });

module.exports = router;