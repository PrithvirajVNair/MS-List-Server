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

// recommendation
route.get("/recommendation/:id",showController.getSimilarShows)

// ........................USER.....................................

//get recent shows
route.get("/recent-home",showController.getRecentShowController)

//get popular shows
route.get("/popular-home",showController.getPopularShowController)

// get a show
route.get("/details/:id",showController.getAShowController)

// get category/language based shows
route.get("/category/:categoryname",showController.getShowCategoryController)

// ..............................ADMIN..............................

//add shows
route.post("/add-shows",showController.addShowController)

// get show
route.get("/get-adminshows",adminController.getShowController)

// get users
route.get("/get-users",adminController.getUserController)

// delete users
route.delete("/delete-user",adminController.deleteUserController)

// delete show
route.delete("/delete-show",adminController.deleteShowController)

module.exports = route