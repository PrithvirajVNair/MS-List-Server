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
        type:String
    },
    bio:{
        type:String,
        default:"User"
    }
})

// create model... every model should be plural
const users = mongoose.model("user",userSchema)
module.exports = users