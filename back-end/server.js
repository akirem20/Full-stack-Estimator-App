const dotenv = require("dotenv");
const connectDB = require("./models/dbmodels"); // We'll create this next
const app = require("./app");

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
