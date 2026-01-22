const express = require("express");

const signupSchema = require("../validators/auth.validator").signupSchema;
const validator = require("express-joi-validation").createValidator({
  passError: true,
});

const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", validator.body(signupSchema), authController.signUp);

router.post("/login", authController.logIn)

module.exports = router;