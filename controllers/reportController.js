const reports = require("../models/reportModel")



exports.addReportController = async(req,res) => {
    const {id} = req.body    
    const email = req.payload    
    try{
        const existingReport = await reports.findOne({commentId:id,reportedBy:email})
        if(existingReport){
            res.status(401).json("You Have Already Reported This Comment!")
        }
        else{
            const newReport = new reports({
                commentId:id, reportedBy:email
            })
            await newReport.save()
            res.status(200).json("Reported Successfully...")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.getReportController = async(req,res) => {
    try{
        const allReports = await reports.find().populate({
            path:"commentId",
            populate: {
                path:"userId"
            }
        })
        .sort({commentId:1})
        res.status(200).json(allReports)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.deleteReportController = async(req,res) => {
    const id = req.body.id
    console.log(id);
    
    try{
        const deleteReport = await reports.deleteOne({_id:id})
        res.status(200).json("Deleted Successfully...")
    }
    catch(err){
        res.status(500).json(err)
    }
}