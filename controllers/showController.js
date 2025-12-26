// import model
const lists = require("../models/listModel");
const shows = require("../models/showModel");
const { generateSummary, generateEmbedding, cosineSimilarity } = require("../utils/aiUtils");


//add show controller
exports.addShowController = async (req, res) => {
    const { title, language, summary, description, genre, embeddings, category, score, scoreCount, imageUrl, coverUrl } = req.body
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
                title, language, summary: showSummary, description, genre, embeddings: showEmbeddings, category, score, scoreCount, imageUrl, coverUrl
            })
            await newShow.save()
            res.status(200).json(newShow)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.editContentController = async (req, res) => {
    const { _id, title, category, language, genre, summary, description, embeddings } = req.body
    // console.log(req.body);
    
    try {
        const editContent = await shows.findOne({ _id: _id })
        // console.log(editContent);
        
        if (!editContent) {
            return res.status(404).json("Content Not Found")
        }
        else {
            if (editContent.description != description) {
                let showSummary = await generateSummary(description)
                const showEmbeddings = await generateEmbedding(description)
                editContent.description = description
                editContent.summary = showSummary
                editContent.embeddings = showEmbeddings
            }
            editContent.title = title
            editContent.category = category
            editContent.language = language
            editContent.genre = genre
            await editContent.save()
            res.status(200).json(editContent)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

// get show controller
exports.getShowController = async (req, res) => {
    const searchData = req.query.search
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    try {
        const allShows = await shows.find(query)
        const movieCount = await shows.countDocuments({ category: "Movie" })
        const seriesCount = await shows.countDocuments({ category: "Series" })
        res.status(200).json({ allShows, movieCount, seriesCount })
    }
    catch (err) {
        res.status(500).json(err)
    }
}

//get show by category
exports.getShowCategoryController = async (req, res) => {
    const { categoryname } = req.params
    const searchData = req.query.search
    const query = {
        title: {
            $regex: searchData, $options: "i"
        }
    }
    try {
        const show = await shows.find({ $and: [query, { $or: [{ language: { $regex: categoryname, $options: "i" } }, { genre: { $regex: categoryname, $options: "i" } }] }] })
        res.status(200).json(show)
        console.log(categoryname);

    }
    catch (err) {
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

exports.getMostRatedShowController = async (req, res) => {
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

exports.updateShowRatingController = async (req, res) => {
    const { showid } = req.body
    try {
        const ratings = await lists.find({ showid: showid }, { rating: 1 })
        if (!ratings.length) {
            await shows.findByIdAndUpdate(showid, { score: 0 })
            return 0
        }
        const count = ratings.length
        const sum = ratings.reduce((total, item) => total + item.rating, 0)
        const avg = (sum / ratings.length).toFixed(1)
        await shows.findByIdAndUpdate(showid, { score: avg, scoreCount: count })
        res.status(200).json(avg)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getPopularShowController = async (req, res) => {
    try {
        const popularShows = await shows.find().sort({ listCount: -1 }).limit(6)
        res.status(200).json(popularShows)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getFeaturedShowController = async (req, res) => {
    try {
        const FeaturedShows = await shows.find({ featured: true })
        res.status(200).json(FeaturedShows)
    }
    catch (err) {
        res.status(500).json(err)
    }
}