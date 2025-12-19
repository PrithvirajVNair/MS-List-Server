const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    showId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"show",
        require:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

const comments = mongoose.model("comment",commentSchema)
module.exports = comments