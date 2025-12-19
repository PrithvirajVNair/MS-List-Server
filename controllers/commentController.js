const comments = require("../models/commentModel")
const users = require("../models/userModel")

exports.addCommentController = async(req,res) => {
    const {comment,username,profile,showId, verified} = req.body
    const email = req.payload
    try{
        const user = await users.findOne({email:email})
        const {_id} = user
        const newComment = new comments({
            comment,userId:_id,showId
        })
        await newComment.save()
        res.status(200).json(newComment)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.getCommentController = async(req,res) => {
    const {id} = req.body
    
    try{
        const existingComments = await comments.find({showId:id}).sort({createdAt:-1}).populate("userId")
        res.status(200).json(existingComments)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.deleteCommentController = async(req,res) => {
    const id = req.body.id
    // console.log(id);
    
    try{
        const deleteComment = await comments.deleteOne({_id:id})
        res.status(200).json(deleteComment)
    }
    catch(err){
        res.status(500).json(err)
    }
}