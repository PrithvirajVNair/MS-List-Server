// import mongoose
const mongoose = require("mongoose")

// create schema
const activitiesSchema = new mongoose.Schema({
    category:{
        type: String,
        required:true
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "list"
    },
    commentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    },
    userMail:{
        type: String,
        required:true
    },
    createdAt:{
        type : Date,
        default: Date.now
    }
})

const activities = mongoose.model("activity", activitiesSchema)
module.exports = activities