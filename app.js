const express = require("express");
require("dotenv").config();

const db = require("./database/main")

let port = process.env.PORT || 2000;

const app = express();

const authRoute = require('./routes/auth.route')

app.use("/api", authRoute);
app.use("/", (req, res, next) => {
  res.send("IAM Microservice")
})

//Middleware to handle the error
app.use((err, req, res, next) => {
  res.status(statusCode).json({
    success: false,
    "Status Code" : statusCode,
    "Error message": message
  })
})

db.once("connection", () => {
  console.log("Database on!");
});
db.on("error", (error) => {
  console.log("Error", error);
});
db.on("disconnected", () => {
  console.log("MBD Disconnected");
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})
  
