const mongoose = require("mongoose");

const pipelineSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true
    },
    buildTime: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["SUCCESS", "FAILED"],
        required: true
    },
    vulnerabilities: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("PipelineRun", pipelineSchema);