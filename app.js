const express = require("express");
require("dotenv").config();

const db = require("./database/main")

let port = process.env.PORT || 2000;

const app = express();

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
  
