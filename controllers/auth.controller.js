const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user.model");
const errorHandler = require("../utilities/error");

exports.signUp = async (req, res, next) => {
  //get inputs
  const { email, password, confirmPassword } = req.body;

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
