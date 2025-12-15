// import mongoose
const mongoose = require("mongoose")

//create schema for custom list
const customListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        required: true
    },
    sDate: {
        type: Date
    },
    eDate: {
        type: Date
    },
    userMail: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        default: false
    }
})

const mylists = mongoose.model("mylist",customListSchema)
module.exports = mylists