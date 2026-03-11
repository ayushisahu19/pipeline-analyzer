/*const express = require("express");
const router = express.Router();
const controller = require("../controllers/pipelineController");

router.post("/pipeline", controller.createRun);
router.get("/pipeline", controller.getRuns);
router.get("/pipeline/summary/:branch", controller.getBranchSummary);

module.exports = router;*/
const express = require("express")
const router = express.Router()
const Pipeline = require("../models/Pipeline")

// Save pipeline metrics
router.post("/pipeline", async (req, res) => {
  try {

    const { branch, buildTime, status, vulnerabilities } = req.body

    const run = new Pipeline({
      branch: branch,
      buildTime: buildTime,
      status: status,
      vulnerabilities: vulnerabilities,
      timestamp: new Date()
    })

    await run.save()

    res.json({ message: "Metrics saved successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to save metrics" })
  }
})

module.exports = router