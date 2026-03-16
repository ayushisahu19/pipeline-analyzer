// // 

// // src/app.js
// const express = require("express");
// const cors = require("cors");
// const pipelineRoutes = require("./routes/pipelineRoutes"); // adjust path if needed

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api", pipelineRoutes);

// // basic health route
// app.get("/health", (req, res) => res.json({ ok: true }));

// module.exports = app;
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});