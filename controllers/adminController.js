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
