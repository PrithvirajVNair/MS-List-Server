// import model
const shows = require("../models/showModel");
const { generateSummary, generateEmbedding } = require("../utils/aiUtils");


//add show controller
exports.addShowController = async (req, res) => {
    console.log(req.body);
    
    const { title, language, summary, description, genre, embeddings, category, score, imageUrl } = req.body
    console.log(title, language, summary, description, genre, embeddings, category, score, imageUrl);
    try {
        const existingShow = await shows.findOne({ title, language, category })
        if (existingShow) {
            res.status(401).json("Show Already Exists")
        }
        else{
            let showSummary = await generateSummary(description)
            const showEmbeddings = await generateEmbedding(description)
            if(!showSummary){
                showSummary = "Summary Unavailable"
            }
            const newShow = new shows({
                title, language, summary:showSummary, description, genre, embeddings:showEmbeddings, category, score, imageUrl
            })
            await newShow.save()
            res.status(200).json(newShow)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// get show controller
exports.getShowController = async(req,res) => {
    try{
        const allShows = await shows.find()
        const movieCount = await shows.countDocuments({category:"Movie"})
        const seriesCount = await shows.countDocuments({category:"Series"})
        res.status(200).json({allShows,movieCount,seriesCount})
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.getRecentShowController = async(req,res) => {
    try{
        const RecentShows = await shows.find().sort({_id:-1}).limit(6)
        res.status(200).json(RecentShows)
    }
    catch(err){
        res.status(500).json(err)
    }
}