//import mongoose
const mongoose = require("mongoose")

//create schema

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profile:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
    },
    bio:{
        type:String,
        default:"User"
    }
})

// create model... every model should be plural
const users = mongoose.model("user",userSchema)
module.exports = users