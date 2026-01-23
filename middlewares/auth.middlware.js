const jwt = require("jsonwebtoken");
require("dotenv").config();

const errorHandler = require("../utilities/error");

/*const verifyToken = (token)=> {
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, function(err, decoded) {
  if (err) {
      err = {
        name: err.name,
        message: err.message,
        expiredAt: err.expiredAt
      }
  }
  else{
    return decoded
  }
});
}*/


/* This function extracts and verifies the token passed in the header, to get the needed information 
e.g if user is logged in and their roles(s)
In the header, a token looks like this: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjkxMzg5NTI5OTk
*/
const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    try {
      let decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      req.user=decode
      console.log(req.user)
      next()
    } catch (error) {
      next(errorHandler(401, "Token is invalid or expired. Log in to generate a new token"));
    }
  } else {
    next(errorHandler(400, "Bad Request"));
  }
};

module.exports = verifyToken;
