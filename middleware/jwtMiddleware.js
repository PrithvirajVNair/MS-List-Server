const jwt = require("jsonwebtoken")

const jwtMiddleware = (req,res,next) => {
    console.log("Inside JWT Middleware");
    
}

module.exports = jwtMiddleware