const jwt = require("jsonwebtoken");

const errorHandler = require("../utilities/error");

exports.adminPage = async (req, res, next) => {
    res.status(200).json({message: "Welcome to the admin page"})
}

exports.userPage = async (req, res, next) => {
    res.status(200).json({message: "Welcome to the user page"})
}