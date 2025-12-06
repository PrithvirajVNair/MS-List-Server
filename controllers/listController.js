const lists = require("../models/listModel")


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
    console.log(query);

    try {
        const listData = await lists.find({ $and: [query, { userMail: email }] })
        const count = await lists.countDocuments({ userMail: email })
        res.status(200).json({ listData, count })

    }
    catch (err) {
        res.status(500).json(err)
    }
}