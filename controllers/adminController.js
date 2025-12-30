const shows = require("../models/showModel")
const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const saltRounds = 10

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

exports.getShowController = async(req,res) => {
    try{
        const AllShows = await shows.find()
        res.status(200).json(AllShows)
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

exports.addToFeaturedController = async(req,res) => {
    const {id} = req.body
    console.log(id);
    
    try{
        const AllFeaturedShows = await shows.findByIdAndUpdate(id,{featured:true},{new:true})
        res.status(200).json(AllFeaturedShows)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.removeFromFeaturedController = async(req,res) => {
    const {id} = req.body
    console.log(id);
    
    try{
        const AllFeaturedShows = await shows.findByIdAndUpdate(id,{featured:false},{new:true})
        res.status(200).json(AllFeaturedShows)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.banUserController = async(req,res) => {
    const {email} = req.body
    console.log(email);
    
    try{
        const User = await users.findOne({email:email})
        if(!User){
            return res.status(401).json("User Not Found")
        }

        User.restriction = true
        await User.save()
        res.status(200).json("User Banned Successfully")
        
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.unBanUserController = async(req,res) => {
    const {email} = req.body
    try{
        const User = await users.findOne({email:email})
        if(!User){
            return res.status(401).json("User Not Found")
        }

        User.restriction = false
        await User.save()
        res.status(200).json("User Unbanned Successfully")
        
    }
    catch(err){
        res.status(500).json(err)
    }
}