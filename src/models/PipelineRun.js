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

    // ---- New fields to support AI failure diagnosis ----
    // Both are optional: only meaningful when status === "FAILED".
    // Keep them short — this is what gets sent to the LLM, not a full log dump.

    failedStage: {
        type: String,
        default: null
        // e.g. "Run Tests", "Vulnerability Scan", "Install Dependencies"
    },

    logExcerpt: {
        type: String,
        default: null,
        maxlength: 2000
        // A short, SANITIZED snippet of the failing stage's output.
        // Sanitize/truncate in the Jenkinsfile before this ever leaves
        // the build agent - never store or forward raw, unredacted logs.
    },

    aiDiagnosis: {
        category: { type: String, default: null },
        summary: { type: String, default: null },
        evidence: { type: String, default: null },
        recommendedAction: { type: String, default: null },
        certainty: { type: String, default: null }
        // Populated AFTER the AI endpoint runs — not set by Jenkins directly.
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("PipelineRun", pipelineSchema);