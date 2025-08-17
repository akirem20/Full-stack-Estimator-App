const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userroutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

module.exports = app; // Export app to be used in server.js
