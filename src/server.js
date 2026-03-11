/*const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://mongodb:27017/pipelineDB")
.then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, "0.0.0.0",() => {
        console.log(`Server running on port ${PORT}`);
    });

})
.catch(err => {
    console.error("MongoDB connection error:", err);
});*/
const express = require("express");
const connectDB = require("./config/db");

const app = require("./app");

const PORT = 5000;

connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});