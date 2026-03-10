const PipelineRun = require("../models/PipelineRun");

async function createRun(req, res) {
    try {
        const run = new PipelineRun(req.body);
        await run.save();
        res.status(201).json(run);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getRuns(req, res) {
    const runs = await PipelineRun.find();
    res.json(runs);
}

async function getBranchSummary(req, res) {
    const branch = req.params.branch;

    const runs = await PipelineRun.find({ branch });

    const total = runs.length;
    const success = runs.filter(r => r.status === "SUCCESS").length;

    const avgBuild = total > 0
        ? runs.reduce((sum, r) => sum + r.buildTime, 0) / total
        : 0;

    const successRate = total > 0
        ? (success / total) * 100
        : 0;

    res.json({
        branch,
        totalRuns: total,
        successRate,
        averageBuildTime: avgBuild
    });
}

module.exports = {
    createRun,
    getRuns,
    getBranchSummary
};