const express = require("express");
const cors = require("cors");
const pipelineRoutes = require("./routes/pipelineRoutes");

const app = express();

// Middleware
app.use(cors());                 // Allow requests from React frontend
app.use(express.json());         // Parse JSON request body


// REGISTER ROUTES HERE
app.use("/api", pipelineRoutes);

// Root route (optional health check)
app.get("/", (req, res) => {
  res.send("CI/CD Pipeline Analyzer API is running");
});

module.exports = app;