const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    showId:{
        type:String,
        require:true
    },
    userMail:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    profile:{
        type:String,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const comments = mongoose.model("comment",commentSchema)
module.exports = comments