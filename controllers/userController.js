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
            // if (existingUser.username == username) {
            //     return res.status(400).json("Username already taken!")
            // }
        }
        else {
            const otp = Math.floor(100000 + Math.random() * 900000)
            console.log(otp);

            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newUser = new users({
                username, email, password: hashedPassword, otp: otp, otpExpiresAt: Date.now() + 10 * 60 * 1000
            })
            await newUser.save()
            // sendEmail(email, "Welcome To MS LIST", `Your OTP is ${otp}`, `<h2>Your OTP is ${otp}</h2>`)
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
                // if (existingUser.otpVerified) {
                const match = await bcrypt.compare(password, existingUser.password)
                if (match) {
                    const token = jwt.sign({ userMail: existingUser.email, username: existingUser.username, profile: existingUser.profile, administrator:existingUser.administrator }, process.env.secretkey)
                    return res.status(200).json({ existingUser, token })
                }
                else {
                    return res.status(401).json("Password Does not Match!")
                }
                // }
                // else {
                //     if (!existingUser.otp) {
                //         const otp = Math.floor(100000 + Math.random() * 900000)
                //         await users.findByIdAndUpdate(existingUser._id, { otp: otp, otpExpiresAt: Date.now()+10*60*1000 }, { new: true })
                //     }
                //     if (Date.now() > existingUser.otpExpiresAt){
                //         const otp = Math.floor(100000 + Math.random() * 900000)
                //         await users.findByIdAndUpdate(existingUser._id, { otp: otp, otpExpiresAt: Date.now()+10*60*1000 }, { new: true })
                //     }
                //     sendEmail(
                //         email,
                //         "Your MS List Verification Code",
                //         `Your MS List OTP is ${existingUser.otp}. This code will expire in 10 minutes.`,
                //         `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
                //         <h2 style="color: #2c3e50; text-align: center;">Welcome to MS List 🎉</h2>
                //         <p>Hello,</p>
                //         <p>Thank you for choosing <strong>MS List</strong>. Please use the verification code below to complete your sign-in:</p>
                //         <div style="text-align: center; margin: 30px 0;">
                //         <span style="font-size: 28px; letter-spacing: 6px; font-weight: bold; color: #1abc9c;">
                //         ${existingUser.otp}
                //         </span>
                //         </div>
                //         <p>This code will expire in <strong>10 minutes</strong>.</p>
                //         <p>If you did not request this code, please ignore this email.</p>
                //         <hr style="margin: 30px 0;" />
                //         <p style="font-size: 12px; color: #777; text-align: center;">
                //         © ${new Date().getFullYear()} MS List. All rights reserved.
                //         </p>
                //         </div>`
                //     );
                //     return res.status(403).json('/verify-otp')
                // }
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
                const token = jwt.sign({ userMail: existingUser.email, username: existingUser.username, profile: existingUser.profile, administrator:existingUser.administrator }, process.env.secretkey)
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
    const id = req.params.id
    // console.log(id);
    const query = {
        _id: id
    }
    try {
        const User = await users.findOne(query)        
        res.status(200).json(User)
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.getAUserEmailController = async (req, res) => {
    const { email } = req.query
    // console.log(req.query);
    try {
        const User = await users.findOne({ email })
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
            return res.status(404).json("User not found");
        }
        if (user.otp !== otp) {
            return res.status(400).json("Invalid OTP");
        }
        if (Date.now() > user.otpExpiresAt) {
            return res.status(403).json("OTP Expired");
        }
        user.otpVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();
        res.status(200).json("Account verified successfully");
    }
    catch (err) {
        res.status(500).json(err)
    }
}

exports.editUserController = async (req, res) => {
    const { id, email, username, profile, bio } = req.body
    const userMail = req.payload
    console.log(req.body);

    try {
        if (userMail != email) {
            return res.status(403).json("No Permission")
        }
        else {
            const editProfile = await users.findByIdAndUpdate(id, { username, profile, bio }, { new: true })
            res.status(200).json(editProfile)
        }
    }
    catch (err) {
        res.status(500).json(err)
        console.log(err);

    }
}