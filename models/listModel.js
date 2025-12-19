// import mongoose
const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
    showid:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        require:true
    },
    sDate:{
        type:Date
    },
    eDate:{
        type:Date
    },
    genre:{
        type:[]
    },
    imageUrl:{
        type:String,
        require:true
    },
    userMail:{
        type:String,
        require:true
    },
    favorite:{
        type:Boolean,
        default:false
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

const lists = mongoose.model("list",listSchema)
module.exports = lists