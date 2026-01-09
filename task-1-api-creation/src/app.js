require("dotenv").config();

const express = require("express");
const { connectDB } = require("./db/mongo");
const eventRoutes = require("./routes/events.routes");

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

// Routes
app.use("/api/v3/app", eventRoutes);

const PORT = process.env.PORT || 3000;

// Start server AFTER DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  });

module.exports = app;
