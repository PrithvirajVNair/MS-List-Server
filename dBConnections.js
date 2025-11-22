//import mongoose
const mongoose = require("mongoose")

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connected Successfully");
}).catch(err=>{
    console.log("MongoDB Connection Error!");
    console.log(err);
    
    
})