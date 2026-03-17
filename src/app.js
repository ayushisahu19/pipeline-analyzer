// const express = require("express");
// const cors = require("cors");
// const pipelineRoutes = require("./routes/pipelineRoutes");

// const app = express();

// // Middleware
// app.use(cors());                 // Allow requests from React frontend
// app.use(express.json());         // Parse JSON request body


// // REGISTER ROUTES HERE
// app.use("/api", pipelineRoutes);

// // Root route (optional health check)
// app.get("/", (req, res) => {
//   res.send("CI/CD Pipeline Analyzer API is running");
// });

// module.exports = app;

// src/app.js
const express = require("express");
const cors = require("cors");
const pipelineRoutes = require("./routes/pipelineRoutes"); // adjust path if needed

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", pipelineRoutes);

// basic health route
app.get("/health", (req, res) => res.json({ ok: true }));

module.exports = app;