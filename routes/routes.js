// import express
const express = require("express")

//import controller
const userController = require('../controllers/userController')

//create instance for route
const route = new express.Router()

//path to register
route.post("/register",userController.registerController)

//path to login
route.post("/login",userController.loginController)

//path to google login
route.post("/google-login",userController.googleLoginController)

module.exports = route