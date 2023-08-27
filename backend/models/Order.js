const mongoose = require("mongoose");

// schema
const OrderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }

})


// model
// users collection name
const UserModel = mongoose.model("order",OrderSchema);
module.exports = UserModel