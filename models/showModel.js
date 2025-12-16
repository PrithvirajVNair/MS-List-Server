// import mongoose
const mongoose = require("mongoose")

const showSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    language: {
        type: String,
        require: true
    },
    summary: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    genre: {
        type: Array,
        require: true
    },
    embeddings: {
        type: Array,
        default: []
    },
    category: {
        type: String,
        require: true
    },
    score: {
        type: Number,
        default: 0
    },
    scoreCount: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        require: true
    },
    listCount: {
        type: Number,
        default:0
    },
    coverUrl: {
        type: String
    },
    featured: {
        type: Boolean,
        default: false
    }
})

// create model... every model should be plural
const shows = mongoose.model("show", showSchema)
module.exports = shows