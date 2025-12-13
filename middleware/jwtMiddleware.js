const jwt = require("jsonwebtoken")

const jwtMiddleware = (req, res, next) => {
    // console.log("Inside JWT Middleware");
    const token = req.headers['authorization'].split(' ')[1]
    // console.log(token);
    try {
        const jwtResponse = jwt.verify(token, process.env.secretkey)
        // console.log(jwtResponse);
        req.payload = jwtResponse.userMail
        // console.log(req.payload);
        
        next()
    }
    catch (err) {
        res.status(401).json("Please Login")
    }
}
module.exports = jwtMiddleware