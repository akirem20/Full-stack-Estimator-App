const mongoose = require("mongoose");

const estimateSchema = mongoose.Schema({
  totalFeatures: { type: Number, default: 0 },
  estimatedHours: { type: String, default: "0 hours" },
  timeline: { type: String, default: "0 days" },
  cost: { type: Number, default: 0 },
  featuresSelected: { type: [String], default: [] }
});

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  estimates: [estimateSchema]
});

module.exports = mongoose.model("User", userSchema);
