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
        const runs = await PipelineRun.find().sort({ createdAt: -1 });
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

// ---- AI failure diagnosis, using local Ollama (no API key, no cost) ----

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/chat";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1:8b";

const SYSTEM_PROMPT = `You are a CI/CD failure analyst. You will be given the
name of a failed pipeline stage and a short excerpt from its console log.

Respond with ONLY a JSON object, no other text, matching exactly this shape:
{
  "category": one of ["test_failure", "dependency_vulnerability", "build_error", "missing_env_var", "unknown"],
  "summary": "one plain-English sentence explaining what went wrong",
  "evidence": "the specific line or detail in the log that supports your summary",
  "recommendedAction": "one concrete next step the developer should take",
  "certainty": one of ["high", "medium", "low"]
}

Use "unknown" and "low" certainty if the log excerpt doesn't clearly show a
cause. Do not guess wildly — base your answer only on what's in the excerpt.`;

async function analyzeRun(req, res) {
    try {
        const run = await PipelineRun.findById(req.params.id);

        if (!run) {
            return res.status(404).json({ message: "Pipeline run not found" });
        }

        if (run.status !== "FAILED" || !run.logExcerpt) {
            return res.status(400).json({
                message: "This run has no failure data to analyze (status must be FAILED with a logExcerpt present)"
            });
        }

        const userPrompt = `Failed stage: ${run.failedStage || "Unknown"}

Log excerpt:
${run.logExcerpt}`;

        const ollamaResponse = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt }
                ],
                format: "json",
                stream: false
            })
        });

        if (!ollamaResponse.ok) {
            const errText = await ollamaResponse.text();
            return res.status(502).json({
                message: "Ollama request failed",
                detail: errText
            });
        }

        const data = await ollamaResponse.json();
        const rawContent = data.message && data.message.content;

        let diagnosis;
        try {
            diagnosis = JSON.parse(rawContent);
        } catch (parseErr) {
            return res.status(502).json({
                message: "Ollama returned output that wasn't valid JSON",
                rawContent
            });
        }

        run.aiDiagnosis = {
            category: diagnosis.category || "unknown",
            summary: diagnosis.summary || null,
            evidence: diagnosis.evidence || null,
            recommendedAction: diagnosis.recommendedAction || null,
            certainty: diagnosis.certainty || "low"
        };

        await run.save();

        res.json(run);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createRun,
    getRuns,
    getBranchSummary,
    compareBranches,
    analyzeRun
};