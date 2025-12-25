const lists = require("../models/listModel")
const shows = require("../models/showModel")
const users = require("../models/userModel")


exports.addListController = async (req, res) => {
    const { showid, title, rating, status, sDate, eDate, genre, imageUrl, userMail, favorite } = req.body
    const email = req.payload
    try {
        const existingList = await lists.findOne({ userMail: email, showid: showid })
        if (existingList) {
            res.status(401).json("Show is Already inside List")
        }
        else {
            const newList = new lists({
                showid, title, rating, status, sDate, eDate, genre, imageUrl, userMail: email, favorite
            })
            await newList.save()
            // following is for popularity
            await shows.findByIdAndUpdate(showid,{$inc:{listCount:1}})
            res.status(200).json(newList)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getListController = async (req, res) => {
    const email = req.payload
    let searchData = req.query.search
    if (!searchData || searchData === "undefined") {
        searchData = "";
    }
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    // console.log(query)

    try {
        const listData = await lists.find({ $and: [query, { userMail: email }] })
        const count = await lists.countDocuments({ userMail: email })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.addFavListController = async(req,res) => {
    const { _id, showid, title, rating, status, sDate, eDate, genre, imageUrl, userMail, favorite } = req.body
    console.log( _id,showid, title, rating, status, sDate, eDate, genre, imageUrl, userMail, favorite);
    
    try{
        const existingShow = await lists.findByIdAndUpdate(_id,{eDate, showid, title, rating, status, sDate, genre, imageUrl, userMail, favorite:true},{new:true})
        res.status(200).json(existingShow)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.removeFavListController = async(req,res) => {
    const { _id, showid, title, rating, status, sDate, eDate, genre, imageUrl, userMail, favorite } = req.body
    console.log( _id,showid, title, rating, status, sDate, eDate, genre, imageUrl, userMail, favorite);
    
    try{
        const existingShow = await lists.findByIdAndUpdate(_id,{eDate, showid, title, rating, status, sDate, genre, imageUrl, userMail, favorite:false},{new:true})
        res.status(200).json(existingShow)
    }
    catch(err){
        res.status(200).json(err)
    }
}

exports.getFavListController = async (req, res) => {
    const email = req.payload
    let searchData = req.query.search
    if (!searchData || searchData === "undefined") {
        searchData = "";
    }
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    console.log(query);

    try {
        const listData = await lists.find({ $and: [query, { userMail: email, favorite:true }] })
        const count = await lists.countDocuments({ userMail: email, favorite:true })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getPlanningListController = async (req, res) => {
    const email = req.payload
    let searchData = req.query.search
    if (!searchData || searchData === "undefined") {
        searchData = "";
    }
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    console.log(query);

    try {
        const listData = await lists.find({ $and: [query, { userMail: email, status:"planning" }] })
        const count = await lists.countDocuments({ userMail: email, status:"planning" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getWatchingListController = async (req, res) => {
    const email = req.payload
    let searchData = req.query.search
    if (!searchData || searchData === "undefined") {
        searchData = "";
    }
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    console.log(query);

    try {
        const listData = await lists.find({ $and: [query, { userMail: email, status:"watching" }] })
        const count = await lists.countDocuments({ userMail: email, status:"watching" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getOnHoldListController = async (req, res) => {
    const email = req.payload
    let searchData = req.query.search
    if (!searchData || searchData === "undefined") {
        searchData = "";
    }
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    console.log(query);

    try {
        const listData = await lists.find({ $and: [query, { userMail: email, status:"onhold" }] })
        const count = await lists.countDocuments({ userMail: email, status:"onhold" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getCompletedListController = async (req, res) => {
    const email = req.payload
    let searchData = req.query.search
    if (!searchData || searchData === "undefined") {
        searchData = "";
    }
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    console.log(query);

    try {
        const listData = await lists.find({ $and: [query, { userMail: email, status:"completed" }] })
        const count = await lists.countDocuments({ userMail: email, status:"completed" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getDroppedListController = async (req, res) => {
    const email = req.payload
    let searchData = req.query.search
    if (!searchData || searchData === "undefined") {
        searchData = "";
    }
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    console.log(query);

    try {
        const listData = await lists.find({ $and: [query, { userMail: email, status:"dropped" }] })
        const count = await lists.countDocuments({ userMail: email, status:"dropped" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.putStatusListController = async(req,res) => {
    const {value, data}= req.body
    const {_id,showid,title,rating,status,sDate,eDate,genre,imageUrl,userMail,favorite} = data
    // console.log(value,_id,showid,title,rating,status,sDate,eDate,genre,imageUrl,userMail,favorite);
    
    
    try{
        const existingShow = await lists.findByIdAndUpdate(_id,{eDate, showid, title, rating, status:value, sDate, genre, imageUrl, userMail, favorite},{new:true})
        res.status(200).json(existingShow)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.putListController = async(req,res) => {
    const { _id,showid,title,rating,status,sDate,eDate,genre,imageUrl,userMail,favorite }= req.body
    // console.log(value,_id,showid,title,rating,status,sDate,eDate,genre,imageUrl,userMail,favorite);
    
    
    try{
        const existingShow = await lists.findByIdAndUpdate(_id,{eDate:eDate, showid, title, rating:rating, status, sDate:sDate, genre, imageUrl, userMail, favorite},{new:true})
        res.status(200).json(existingShow)
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.deleteListController = async(req,res) => {
    const {id,showid} = req.body
    // console.log(req.body);
    
    try{
        const deleteStatus = await lists.findByIdAndDelete(id)
        res.status(200).json(deleteStatus)
        await shows.findByIdAndUpdate(showid,{$inc:{listCount:-1}})
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.getListCountController = async(req,res) => {
    const id = req.params.id
    console.log(id); 
    
    try{
        const User = await users.findOne({_id:id})
        const allShows = await lists.countDocuments({userMail:User.email})
        const planning = await lists.countDocuments({userMail:User.email, status:"planning"})
        const watching = await lists.countDocuments({userMail:User.email, status:"watching"})
        const completed = await lists.countDocuments({userMail:User.email, status:"completed"})
        const onhold = await lists.countDocuments({userMail:User.email, status:"onhold"})
        const dropped = await lists.countDocuments({userMail:User.email, status:"dropped"})
        res.status(200).json({allShows,planning,watching,completed,onhold,dropped})
    }
    catch(err){
        res.status(500).json(err)
    }
}