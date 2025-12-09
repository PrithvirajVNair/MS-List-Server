// import express
const express = require("express")

//import controller
const userController = require('../controllers/userController')
const showController = require('../controllers/showController')
const adminController = require('../controllers/adminController')
const listController = require('../controllers/listController')
const commentController = require('../controllers/commentController')
const jwtMiddleware = require("../middleware/jwtMiddleware")
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

// add to list
route.post("/add-to-list",jwtMiddleware,listController.addListController)

// get list
route.get("/get-list",jwtMiddleware,listController.getListController)

// get fav list
route.get("/get-fav-list",jwtMiddleware,listController.getFavListController)

// add fav list
route.put("/add-fav-list",jwtMiddleware,listController.addFavListController)

// remove fav list
route.put("/remove-fav-list",jwtMiddleware,listController.removeFavListController)

// get planning list
route.get("/get-planning-list",jwtMiddleware,listController.getPlanningListController)

// get watching list
route.get("/get-watching-list",jwtMiddleware,listController.getWatchingListController)

// get onhold list
route.get("/get-onhold-list",jwtMiddleware,listController.getOnHoldListController)

// get completed list
route.get("/get-completed-list",jwtMiddleware,listController.getCompletedListController)

// get dropped list
route.get("/get-dropped-list",jwtMiddleware,listController.getDroppedListController)

// put status list
route.put("/put-status-list",jwtMiddleware,listController.putStatusListController)

// put list
route.put("/edit-list",jwtMiddleware,listController.putListController)

// add comment
route.post("/add-comment",jwtMiddleware,commentController.addCommentController)

//get comments
route.post("/get-comment",commentController.getCommentController)

//delete comments
route.delete("/delete-comment",commentController.deleteCommentController)

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