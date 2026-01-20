const express = require("express");

const authSchema = require("../validators/auth.validator");
const validator = require('express-joi-validation').createValidator({passError: true})

const authController = require("../controllers/auth.controller")

const router = express.Router()

router.post("/signup", validator.body(authSchema), authController.signUp)

module.exports = router;