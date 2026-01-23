const jwt = require("jsonwebtoken");
require("dotenv").config();

const errorHandler = require("../utilities/error");

// This function checks for roles in the token - req.user (for authorization)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(errorHandler(403, "Unauthorized"));
    }
    next();
  };
};

module.exports = authorizeRoles;
