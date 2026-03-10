const PipelineRun = require("../models/PipelineRun");

exports.createRun = async (req, res) => {
    try {
        const run = new PipelineRun(req.body);

        await run.save();

        console.log("Pipeline run stored:", run);

        res.status(201).json(run);

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};

exports.getRuns = async (req, res) => {

    const runs = await PipelineRun.find();

    res.json(runs);
};

exports.getBranchSummary = async (req, res) => {

    const branch = req.params.branch;

    const runs = await PipelineRun.find({ branch });

    const total = runs.length;

    const success = runs.filter(r => r.status === "SUCCESS").length;

    const avgBuild =
        total > 0
            ? runs.reduce((sum, r) => sum + r.buildTime, 0) / total
            : 0;

    const successRate =
        total > 0
            ? (success / total) * 100
            : 0;

    res.json({
        branch,
        totalRuns: total,
        successRate,
        averageBuildTime: avgBuild
    });
};