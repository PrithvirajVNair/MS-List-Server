const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    commentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"comment",
        required: true
    },
    reportedBy:{
        type: String,
        required:true
    },
    reportDate:{
        type: Date,
        default:Date.now
    }
})

const reports = mongoose.model("report",reportSchema)
module.exports = reports