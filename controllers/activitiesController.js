const activities = require("../models/activitiesModel")
const users = require("../models/userModel")



exports.addShowActivityController = async(req,res) =>{
    const {showId} = req.body
    const email = req.payload
    try{
        const newActivity = new activities({
            showId,userMail:email,category:"list"
        })
        await newActivity.save()
        res.status(200).json(newActivity)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.addCommentActivityController = async(req,res) =>{
    const {commentId} = req.body
    console.log(req.body);
    const email = req.payload
    try{
        const newActivity = new activities({
            commentId,userMail:email,category:"comment"
        })
        await newActivity.save()
        res.status(200).json(newActivity)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.deleteShowActivityController = async(req,res) => {
    const {showId} = req.body
    console.log(req.body);
    const email = req.payload
    try{
        const showActivity = await activities.findOne({userMail:email, showId})
        console.log(showActivity);
        
        const deleteShowActivity = await activities.findByIdAndDelete(showActivity._id)
        res.status(200).json(deleteShowActivity)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.deleteCommentActivityController = async(req,res) => {
    const {commentId} = req.body
    console.log(req.body);
    
    const email = req.payload
    try{
        const commentActivity = await activities.findOne({userMail:email, commentId})
        console.log(commentActivity);
        
        const deleteCommentActivity = await activities.findByIdAndDelete(commentActivity._id)
        res.status(200).json(deleteCommentActivity)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.getActivityController = async(req,res) => {
    const id = req.params.id
    try{
        const User = await users.findOne({_id:id})
        const allCommentActivities = await activities.find({userMail:User.email,category:"comment"}).populate({
            path:"commentId",
            populate:{
                path:"showId"
            }
        })
        const allListActivities = await activities.find({userMail:User.email,category:"list"}).populate("showId")
        allCommentActivities.push(...allListActivities)
        const sorted = allCommentActivities.sort((a,b)=>b.createdAt-a.createdAt)
        // const Length = allCommentActivities.length + allListActivities.length
        res.status(200).json(sorted)
    }
    catch(err){
        res.status(500).json(err)
    }
}