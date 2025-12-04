const shows = require("../models/showModel")
const users = require("../models/userModel")

exports.getUserController = async(req,res) => {
    try{
        const allUsers = await users.find()
        const userCount = await users.countDocuments()
        res.status(200).json({allUsers,userCount})
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.deleteUserController = async(req,res) => {
    const {id} = req.body
    try{
        const deleteUser = await users.deleteOne({_id:id})
        res.status(200).json(deleteUser)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.deleteShowController = async(req,res) => {
    const {id} = req.body
    try{
        const deleteShow = await shows.deleteOne({_id:id})
        res.status(200).json(deleteShow)
    }
    catch(err){
        res.status(500).json(err)
    }
}