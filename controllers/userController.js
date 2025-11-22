//import model
const users = require("../models/userModel")
const bcrypt = require("bcrypt")
const saltRounds = 10
//register
exports.registerController = async(req,res)=>{
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({$or:[{email},{username}]})
        if(existingUser){
            if(existingUser.email == email){
                return res.status(400).json("Already Registered User...")
            }
            if(existingUser.username == username){
                return res.status(400).json("Username already taken!")
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const newUser = new users({
                username,email,password:hashedPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err){
        res.status(500).json(err)
        console.log(err);
        
    }
}

//login
exports.loginController = async(req,res) => {
    const {username,password} = req.body
    try{
        const existingUser = await users.findOne({username})
        if(existingUser){
            const match = await bcrypt.compare(password,existingUser.password)
            if(match){
                return res.status(200).json(existingUser)
            }
            else{
                return res.status(401).json("Password Does not Match!")
            }
        }
        else{
            res.status(401).json("User Does Not Exist..")
        }
    }catch(err){
        res.status(500).json(err)
        console.log(err);
        
    }
}