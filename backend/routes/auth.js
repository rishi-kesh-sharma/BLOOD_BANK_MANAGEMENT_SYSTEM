const express = require("express");
const {
  authController: { loginUser, logout, registerUser },
} = require("../controllers");
const router = express.Router();

const {
  authMiddleWare: { isAuthenticatedUser, authorizeRoles, isAuthorizedUser },
} = require("../middlewares");

// for all
router.route("/register").post(authorizeRoles("superadmin"), registerUser);

//for registered users
router.route("/login").post(loginUser);

// for logged in user
router.route("/logout").get(isAuthenticatedUser, logout);

module.exports = router;
