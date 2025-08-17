const express = require("express");
const {
  registerUser,
  loginUser,
  addEstimate,
} = require("../controllers/usercontroller");

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user and return token
// @access  Public
router.post("/login", loginUser);

// @route   POST /api/users/estimate
// @desc    Add a new estimate for the logged-in user
// @access  Private (add auth middleware later)
router.post("/estimate", addEstimate);

module.exports = router;
