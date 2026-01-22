const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user.model");
const errorHandler = require("../utilities/error");

exports.signUp = async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  //check if user already exists
  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      next(errorHandler(409, "User already exists"));
    } else {
      //if not, register user
      let hashedPassword = bcrypt.hashSync(password, 10);

      let newUser = new User({
        email: email,
        password: hashedPassword,
        role: role
      });

      await newUser.save();
      res.status(200).json({
        message: "User saved Successfully",
      });

      //send confirmation mail
    }
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //Check if user exists
    let user = await User.findOne({ email });

    //if not, ask for signup
    if (!user) {
      return next(errorHandler(409, "User does not exists. Please Sign up."));
    }

    //check if passwords match
    let matchingPassword = bcrypt.compareSync(password, user.password);

    if (!matchingPassword) {
      return next(errorHandler(409, "Incorrect Password"));
    }
    
    //jwt
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};
