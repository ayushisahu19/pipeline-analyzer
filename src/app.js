const express = require("express");
const pipelineRoutes = require("./routes/pipelineRoutes");

const app = express();

app.use(express.json());

// REGISTER ROUTES HERE
app.use("/api", pipelineRoutes);

module.exports = app;