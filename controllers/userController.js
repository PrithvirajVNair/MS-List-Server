//import model
const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require('jsonwebtoken')

//register
exports.registerController = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            if (existingUser.email == email) {
                return res.status(400).json("Already Registered User...")
            }
            if (existingUser.username == username) {
                return res.status(400).json("Username already taken!")
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newUser = new users({
                username, email, password: hashedPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(500).json(err)
        console.log(err);

    }
}

//login
exports.loginController = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password)
            if (match) {
                const token = jwt.sign({ userMail: existingUser.email }, process.env.secretkey)
                return res.status(200).json({existingUser,token})
            }
            else {
                return res.status(401).json("Password Does not Match!")
            }
        }
        else {
            res.status(401).json("User Does Not Exist..")
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err);

    }
}

//login
exports.googleLoginController = async (req, res) => {
    const { email, password, username, photo } = req.body
    hashedPassword = await bcrypt.hash(password,saltRounds)
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ userMail: existingUser.email }, process.env.secretkey)
            res.status(200).json({ existingUser, token })
        }
        else {
            const newUser = new users({
                username, email, password:hashedPassword, profile:photo
            })
            await newUser.save()
            const token = jwt.sign({ userMail: newUser.email }, process.env.secretkey)
            res.status(200).json({existingUser:newUser,token})
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err);

    }
}