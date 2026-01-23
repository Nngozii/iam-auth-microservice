const express = require("express");

const userController = require("../controllers/user.controller")
const verifyToken = require("../middlewares/auth.middlware")
const authorizeRoles = require("../middlewares/rbac.middleware")

const router = express.Router();

//Only the admin can access this route
router.get("/admin", verifyToken, authorizeRoles("admin"), userController.adminPage)

//All can access this route
router.get("/user", verifyToken, authorizeRoles("admin", "user"),userController.userPage)

module.exports = router