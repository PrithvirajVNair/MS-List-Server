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

module.exports = route