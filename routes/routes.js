// import express
const express = require("express")

//import controller
const userController = require('../controllers/userController')
const showController = require('../controllers/showController')
const adminController = require('../controllers/adminController')

//create instance for route
const route = new express.Router()

//path to register
route.post("/register",userController.registerController)

//path to login
route.post("/login",userController.loginController)

//path to google login
route.post("/google-login",userController.googleLoginController)

//get shows
route.get("/search",showController.getShowController)

// ........................USER.....................................

//get recent shows
route.get("/recent-home",showController.getRecentShowController)

//get popular shows
route.get("/popular-home",showController.getPopularShowController)

// ..............................ADMIN..............................

//add shows
route.post("/add-shows",showController.addShowController)

// get users
route.get("/get-users",adminController.getUserController)

module.exports = route