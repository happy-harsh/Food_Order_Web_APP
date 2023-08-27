const mongoose = require("mongoose");

// schema
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    }
})


// model
// users collection name
const UserModel = mongoose.model("users",UserSchema);
module.exports = UserModel