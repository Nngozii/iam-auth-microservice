const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI;

mongoose
  .connect(uri)
  .then((res) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Error COnnecting to Database", err);
  });

const db = mongoose.connection;

module.exports = db;
