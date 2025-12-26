// import express
const express = require("express")

//import controller
const userController = require('../controllers/userController')
const showController = require('../controllers/showController')
const adminController = require('../controllers/adminController')
const listController = require('../controllers/listController')
const customListController = require('../controllers/customListController')
const commentController = require('../controllers/commentController')
const reportController = require('../controllers/reportController')
const activitiesController = require('../controllers/activitiesController')
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

// otp verify
route.put("/verify-otp",userController.verifyOtpController)

// ........................USER.....................................

//get recent shows
route.get("/featured-home",showController.getFeaturedShowController)

//get recent shows
route.get("/recent-home",showController.getRecentShowController)

//get most rated shows
route.get("/most-rated-home",showController.getMostRatedShowController)

//get most rated shows
route.get("/popular-home",showController.getPopularShowController)

// get a show
route.get("/details/:id",showController.getAShowController)

// edit show
route.put("/update-show",showController.editContentController)

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

//update score
route.put("/update-score",showController.updateShowRatingController)

// get user for profile
route.get("/get-a-user/:id",jwtMiddleware,userController.getAUserController)

// get user for header
route.get("/get-a-email-user",jwtMiddleware,userController.getAUserEmailController)

// delete list
route.delete("/delete-list",jwtMiddleware,listController.deleteListController)

// report comment
route.post("/report-comment",jwtMiddleware,reportController.addReportController)

// get reports 
route.get("/get-report",jwtMiddleware,reportController.getReportController)

// get reports 
route.get("/get-list-count/:id",listController.getListCountController)

// add comment activity
route.post("/comment-activity",jwtMiddleware,activitiesController.addCommentActivityController)

// add show activity
route.post("/show-activity",jwtMiddleware,activitiesController.addShowActivityController)

// add show activity
route.get("/get-activity/:id",activitiesController.getActivityController)

//delete comment activity
route.delete("/delete-comment-activity",jwtMiddleware,activitiesController.deleteCommentActivityController)

//delete-show-activity
route.delete("/delete-show-activity",jwtMiddleware,activitiesController.deleteShowActivityController)

//update profile
route.put("/update-profile",jwtMiddleware,userController.editUserController)

// ====> CUSTOM LIST <====

// add to list
route.post("/add-to-custom-list",jwtMiddleware,customListController.addCustomListController)

// get list
route.get("/get-custom-list",jwtMiddleware,customListController.getCustomListController)

// get fav list
route.get("/get-fav-custom-list",jwtMiddleware,customListController.getCustomFavListController)

// add fav list
route.put("/add-fav-custom-list",jwtMiddleware,customListController.addCustomFavListController)

// remove fav list
route.put("/remove-fav-custom-list",jwtMiddleware,customListController.removeCustomFavListController)

// get planning list
route.get("/get-planning-custom-list",jwtMiddleware,customListController.getCustomPlanningListController)

// get watching list
route.get("/get-watching-custom-list",jwtMiddleware,customListController.getCustomWatchingListController)

// get onhold list
route.get("/get-onhold-custom-list",jwtMiddleware,customListController.getCustomOnHoldListController)

// get completed list
route.get("/get-completed-custom-list",jwtMiddleware,customListController.getCustomCompletedListController)

// get dropped list
route.get("/get-dropped-custom-list",jwtMiddleware,customListController.getCustomDroppedListController)

// put status list
route.put("/put-status-custom-list",jwtMiddleware,customListController.putCustomStatusListController)

// put list
route.put("/edit-custom-list",jwtMiddleware,customListController.putCustomListController)

// delete list
route.delete("/delete-custom-list",jwtMiddleware,customListController.deleteCustomListController)

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

// add to featured
route.put("/add-to-featured",adminController.addToFeaturedController)

// remove from featured
route.put("/remove-from-featured",adminController.removeFromFeaturedController)

//delete report
route.delete("/delete-report",reportController.deleteReportController)

// ban user
route.put("/ban-user",adminController.banUserController)

// unban user
route.put("/unban-user",adminController.unBanUserController)

module.exports = route