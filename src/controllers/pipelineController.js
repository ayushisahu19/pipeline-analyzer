// const PipelineRun = require("../models/PipelineRun");

// async function createRun(req, res) {
//     try {
//         const run = new PipelineRun(req.body);
//         await run.save();
//         res.status(201).json(run);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// async function getRuns(req, res) {
//     const runs = await PipelineRun.find();
//     res.json(runs);
// }

// async function getBranchSummary(req, res) {
//     const branch = req.params.branch;

//     const runs = await PipelineRun.find({ branch });

//     const total = runs.length;
//     const success = runs.filter(r => r.status === "SUCCESS").length;

//     const avgBuild = total > 0
//         ? runs.reduce((sum, r) => sum + r.buildTime, 0) / total
//         : 0;

//     const successRate = total > 0
//         ? (success / total) * 100
//         : 0;

//     res.json({
//         branch,
//         totalRuns: total,
//         successRate,
//         averageBuildTime: avgBuild
//     });
// }
// exports.compareBranches = async (req, res) => {
//   try {

//     //const { branch1, branch2 } = req.query;
// const branch1 = decodeURIComponent(req.params.branch1);
// const branch2 = decodeURIComponent(req.params.branch2);
//     if (!branch1 || !branch2) {
//       return res.status(400).json({
//         error: "Please provide branch1 and branch2"
//       });
//     }

//     const analyzeBranch = async (branch) => {

//       const runs = await PipelineRun.find({ branch });

//       const totalRuns = runs.length;

//       const successRuns = runs.filter(
//         r => r.status === "SUCCESS"
//       ).length;

//       const successRate =
//         totalRuns === 0 ? 0 :
//         (successRuns / totalRuns) * 100;

//       const avgBuildTime =
//         totalRuns === 0 ? 0 :
//         runs.reduce((sum, r) => sum + r.buildTime, 0) / totalRuns;

//       return {
//         successRate,
//         avgBuildTime
//       };
//     };

//     const branch1Stats = await analyzeBranch(branch1);
//     const branch2Stats = await analyzeBranch(branch2);

//     res.json({
//       [branch1]: branch1Stats,
//       [branch2]: branch2Stats
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//     createRun,
//     getRuns,
//     getBranchSummary
// };

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
    try {
        const runs = await PipelineRun.find();
        res.json(runs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getBranchSummary(req, res) {
    try {
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function compareBranches(req, res) {
    try {
        const branch1 = decodeURIComponent(req.params.branch1);
        const branch2 = decodeURIComponent(req.params.branch2);

        if (!branch1 || !branch2) {
            return res.status(400).json({
                error: "Please provide branch1 and branch2"
            });
        }

        const analyzeBranch = async (branch) => {
            const runs = await PipelineRun.find({ branch });

            const totalRuns = runs.length;
            const successRuns = runs.filter(r => r.status === "SUCCESS").length;

            const successRate = totalRuns === 0 ? 0 : (successRuns / totalRuns) * 100;
            const avgBuildTime = totalRuns === 0 ? 0 : runs.reduce((sum, r) => sum + r.buildTime, 0) / totalRuns;

            return { totalRuns, successRate, avgBuildTime };
        };

        const branch1Stats = await analyzeBranch(branch1);
        const branch2Stats = await analyzeBranch(branch2);

        res.json({
            [branch1]: branch1Stats,
            [branch2]: branch2Stats
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// ✅ All 4 functions exported together — no mixing of export styles
module.exports = {
    createRun,
    getRuns,
    getBranchSummary,
    compareBranches
};