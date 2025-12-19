const activities = require("../models/activitiesModel")



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

exports.getActivityController = async(req,res) => {
    const email = req.payload
    try{
        const allCommentActivities = await activities.find({userMail:email,category:"comment"}).populate({
            path:"commentId",
            populate:{
                path:"showId"
            }
        })
        const allListActivities = await activities.find({userMail:email,category:"list"}).populate("showId")
        allCommentActivities.push(...allListActivities)
        const sorted = allCommentActivities.sort((a,b)=>b.createdAt-a.createdAt)
        // const Length = allCommentActivities.length + allListActivities.length
        res.status(200).json(sorted)
    }
    catch(err){
        res.status(500).json(err)
    }
}