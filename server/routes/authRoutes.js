const express = require("express");
const {
  userSignUp,
  userLogin,
  getCurrentUser,
  userLogout,
} = require("../controllers/authController");
const validateNewUser = require("../middlewares/validateNewUser");
const validateAuthUser = require("../middlewares/validateAuthUser");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.post("/signup", validateNewUser, userSignUp);
router.post("/login", validateAuthUser, userLogin);
router.get("/current-user", isAuthenticated, getCurrentUser);
router.get("/logout", userLogout);

module.exports = router;
