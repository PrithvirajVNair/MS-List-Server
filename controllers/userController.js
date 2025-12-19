//import model
const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require('jsonwebtoken')
const sendEmail = require("../utils/otpVerify")

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
            const otp = Math.floor(100000 + Math.random() * 900000)
            console.log(otp);

            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newUser = new users({
                username, email, password: hashedPassword, otp:otp
            })
            await newUser.save()
            sendEmail(email, "Welcome To MS LIST", `Your OTP is ${otp}`, `<h2>Your OTP is ${otp}</h2>`)
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
            if (existingUser.restriction) {
                res.status(401).json("This Account is Suspended!")
            }
            else {
                if (existingUser.otpVerified) {
                    const match = await bcrypt.compare(password, existingUser.password)
                    if (match) {
                        const token = jwt.sign({ userMail: existingUser.email, username: existingUser.username, profile: existingUser.profile }, process.env.secretkey)
                        return res.status(200).json({ existingUser, token })
                    }
                    else {
                        return res.status(401).json("Password Does not Match!")
                    }
                }
                else {
                    sendEmail(email, "Welcome To MS LIST", `Your OTP is ${existingUser.otp}`, `<h2>Your OTP is ${existingUser.otp}</h2>`)
                    return res.status(403).json('/verify-otp')
                }
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
    hashedPassword = await bcrypt.hash(password, saltRounds)
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.restriction) {
                res.status(401).json("This Account is Suspended!")
            }
            else {
                const token = jwt.sign({ userMail: existingUser.email, username: existingUser.username, profile: existingUser.profile }, process.env.secretkey)
                res.status(200).json({ existingUser, token })
            }
        }
        else {
            const newUser = new users({
                username, email, password: hashedPassword, profile: photo
            })
            await newUser.save()
            const token = jwt.sign({ userMail: newUser.email }, process.env.secretkey)
            res.status(200).json({ existingUser: newUser, token })
        }
    } catch (err) {
        res.status(500).json(err)
        console.log(err);

    }
}

exports.getAUserController = async (req, res) => {
    const email = req.query.email
    console.log(email);
    const query = {
        email: email
    }
    try {
        const User = await users.findOne(query)
        res.status(200).json(User)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.verifyOtpController = async (req, res) => {
    const { email, otp } = req.body
    try {
        const user = await users.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        user.otpVerified = true;
        user.otp = undefined;
        await user.save();
        res.status(200).json({ message: "Account verified successfully" });
    }
    catch (err) {
        res.status(500).json(err)
    }
}