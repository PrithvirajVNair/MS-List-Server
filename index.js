// import dotenv
require("dotenv").config()
// import express
const express = require("express")
// import cors
const cors = require("cors")

//import route

const route = require('./routes/routes')

//import dBConnection
require('./dBConnections')

//create server -express()

const mslistServer = express()

//server using cors - express()
mslistServer.use(cors())
mslistServer.use(express.json()) //middleware - parse json
mslistServer.use(route)

//create port
PORT = 4000 || process.env.PORT

mslistServer.listen(PORT,()=>{
    console.log(`Server Running is ${PORT}`);
})

//used to check if there is any error in the server
mslistServer.get('/',(req,res)=>{
    res.status(200).send("<h1>MS LIST Server Started</h1>")
})