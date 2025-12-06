const lists = require("../models/listModel")


exports.addListController = async(req,res) => {
    const {showid,title,rating,status,sDate,eDate,genre,imageUrl,userMail,favorite} = req.body
    const email = req.payload
    try{
        const existingList = await lists.findOne({userMail:email, showid:showid})
        if(existingList){
            res.status(401).json("Show is Already inside List")
        }
        else{
            const newList = new lists({
                showid,title,rating,status,sDate,eDate,genre,imageUrl,userMail:email,favorite
            })
            await newList.save()
            res.status(200).json(newList)
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}