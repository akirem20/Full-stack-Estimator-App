// controllers/usercontroller.js
const User = require("../models/usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token (optional, if you plan to use auth)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token, userId: user._id });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add estimate to user
const addEstimate = async (req, res) => {
  try {
    const { userId, estimate } = req.body;

    if (!userId || !estimate) {
      return res.status(400).json({ message: "Missing userId or estimate data" });
    }

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let newEstimate = estimate;
    if (typeof estimate === "string") {
      try {
        newEstimate = JSON.parse(estimate);
      } catch {
        return res.status(400).json({ message: "Invalid estimate format" });
      }
    }

    if (typeof newEstimate !== "object") {
      return res.status(400).json({ message: "Estimate must be an object" });
    }

    user.estimates.push(newEstimate);
    await user.save();

    res.status(201).json({
      message: "Estimate added successfully",
      estimates: user.estimates,
    });
  } catch (err) {
    console.error("Add Estimate Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerUser, loginUser, addEstimate };
