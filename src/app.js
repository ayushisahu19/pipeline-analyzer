const express = require("express");
const pipelineRoutes = require("./routes/pipelineRoutes");

const app = express();

app.use(express.json());

app.use("/api", pipelineRoutes);

module.exports = app;
