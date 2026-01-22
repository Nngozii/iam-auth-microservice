const express = require("express");
require("dotenv").config();

const db = require("./database/main");

let port = process.env.PORT || 2000;

const app = express();

const authRoute = require("./routes/auth.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoute);
app.use("/", (req, res, next) => {
  res.send("IAM Microservice. Please Sign up or Log in");
});

//Middleware to handle Joi validation error
app.use(((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString()
    });
  } else {
    // pass on to another error handler
    next(err);
     }
}))

//Middleware to handle the error
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error"
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
