// import model
const shows = require("../models/showModel");
const { generateSummary, generateEmbedding, cosineSimilarity } = require("../utils/aiUtils");


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
        else {
            let showSummary = await generateSummary(description)
            const showEmbeddings = await generateEmbedding(description)
            if (!showSummary) {
                showSummary = "Summary Unavailable"
            }
            const newShow = new shows({
                title, language, summary: showSummary, description, genre, embeddings: showEmbeddings, category, score, imageUrl
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
exports.getShowController = async (req, res) => {
    try {
        const allShows = await shows.find()
        const movieCount = await shows.countDocuments({ category: "Movie" })
        const seriesCount = await shows.countDocuments({ category: "Series" })
        res.status(200).json({ allShows, movieCount, seriesCount })
    }
    catch (err) {
        res.status(500).json(err)
    }
}

//get show by category
exports.getShowCategoryController = async (req,res) => {
    console.log(req.params);
    
    const {categoryname} = req.params
    try{
        const show = await shows.find({$or:[{language:{$regex:categoryname, $options:"i"}},{genre:{$regex:categoryname,$options:"i"}}]})
        res.status(200).json(show)
        console.log(categoryname);
        
    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.getRecentShowController = async (req, res) => {
    try {
        const RecentShows = await shows.find().sort({ _id: -1 }).limit(6)
        res.status(200).json(RecentShows)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getPopularShowController = async (req, res) => {
    try {
        const PopularShows = await shows.find().sort({ score: -1 }).limit(6)
        res.status(200).json(PopularShows)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getAShowController = async (req, res) => {
    const { id } = req.params
    console.log(id);


    try {
        const show = await shows.findOne({ _id: id })
        res.status(200).json(show)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// show recommendation controller
exports.getSimilarShows = async (req, res) => {
    try {
        const { id } = req.params;
        const mainShow = await shows.findById(id)
        if (!mainShow) {
            return res.status(404).json("Show not found")
        }
        const allShows = await shows.find({ _id: { $ne: id } })
        const results = allShows.map(show => {
            const similarity = cosineSimilarity(
                mainShow.embeddings,
                show.embeddings
            )
            return {
                show,
                similarity
            }
        })
        results.sort((a, b) => b.similarity - a.similarity);
        res.status(200).json(results.slice(0, 6))
    }
    catch (err) {
        res.status(500).json(err)
    }
}