const mylists = require("../models/customListModel")



exports.addCustomListController = async (req, res) => {
    const { title, rating, status, sDate, eDate, userMail, favorite } = req.body
    const email = req.payload
    try {
        const newList = new mylists({
            title, rating, status, sDate, eDate, userMail: email, favorite
        })
        await newList.save()
        res.status(200).json(newList)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getCustomListController = async (req, res) => {
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
        const listData = await mylists.find({ $and: [query, { userMail: email }] })
        const count = await mylists.countDocuments({ userMail: email })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.addCustomFavListController = async(req,res) => {
    const { _id, title, rating, status, sDate, eDate, userMail, favorite } = req.body
    console.log( _id, title, rating, status, sDate, eDate, userMail, favorite);
    
    try{
        const existingShow = await mylists.findByIdAndUpdate(_id,{eDate, title, rating, status, sDate, userMail, favorite:true},{new:true})
        res.status(200).json(existingShow)
    }
    catch(err){
        res.status(200).json(err)
    }
}

exports.removeCustomFavListController = async(req,res) => {
    const { _id, title, rating, status, sDate, eDate, userMail, favorite } = req.body
    console.log( _id, title, rating, status, sDate, eDate, userMail, favorite);
    
    try{
        const existingShow = await mylists.findByIdAndUpdate(_id,{eDate, title, rating, status, sDate, userMail, favorite:false},{new:true})
        res.status(200).json(existingShow)
    }
    catch(err){
        res.status(200).json(err)
    }
}

exports.getCustomFavListController = async (req, res) => {
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
        const listData = await mylists.find({ $and: [query, { userMail: email, favorite:true }] })
        const count = await mylists.countDocuments({ userMail: email, favorite:true })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getCustomPlanningListController = async (req, res) => {
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
        const listData = await mylists.find({ $and: [query, { userMail: email, status:"planning" }] })
        const count = await mylists.countDocuments({ userMail: email, status:"planning" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getCustomWatchingListController = async (req, res) => {
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
        const listData = await mylists.find({ $and: [query, { userMail: email, status:"watching" }] })
        const count = await mylists.countDocuments({ userMail: email, status:"watching" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getCustomOnHoldListController = async (req, res) => {
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
        const listData = await mylists.find({ $and: [query, { userMail: email, status:"onhold" }] })
        const count = await mylists.countDocuments({ userMail: email, status:"onhold" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getCustomCompletedListController = async (req, res) => {
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
        const listData = await mylists.find({ $and: [query, { userMail: email, status:"completed" }] })
        const count = await mylists.countDocuments({ userMail: email, status:"completed" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getCustomDroppedListController = async (req, res) => {
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
        const listData = await mylists.find({ $and: [query, { userMail: email, status:"dropped" }] })
        const count = await mylists.countDocuments({ userMail: email, status:"dropped" })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.putCustomStatusListController = async(req,res) => {
    const {value, data}= req.body
    const {_id,title,rating,status,sDate,eDate,userMail,favorite} = data    
    try{
        const existingShow = await mylists.findByIdAndUpdate(_id,{eDate, title, rating, status:value, sDate, userMail, favorite},{new:true})
        res.status(200).json(existingShow)
    }
    catch(err){
        res.status(200).json(err)
    }
}

exports.putCustomListController = async(req,res) => {
    const { _id,title,rating,status,sDate,eDate,userMail,favorite }= req.body
    try{
        const existingShow = await mylists.findByIdAndUpdate(_id,{eDate:eDate, title, rating:rating, status, sDate:sDate, userMail, favorite},{new:true})
        res.status(200).json(existingShow)
    }
    catch(err){
        res.status(200).json(err)
    }
}

exports.deleteCustomListController = async(req,res) => {
    const {id} = req.body
    console.log(req.body);
    
    try{
        const deleteStatus = await mylists.findByIdAndDelete(id)
        res.status(200).json(deleteStatus)
    }
    catch(err){
        res.status(200).json(err)
    }
}