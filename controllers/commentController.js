const comments = require("../models/commentModel")

exports.addCommentController = async(req,res) => {
    const {comment,username,profile,showId, verified} = req.body
    const email = req.payload
    try{
        const newComment = new comments({
            comment,username,profile,userMail:email,showId,verified
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
        const existingComments = await comments.find({showId:id}).sort({createdAt:-1})
        res.status(200).json(existingComments)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.deleteCommentController = async(req,res) => {
    const id = req.body.id
    console.log(id);
    
    try{
        const deleteComment = await comments.deleteOne({_id:id})
        res.status(200).json(deleteComment)
    }
    catch(err){
        res.status(500).json(err)
    }
}