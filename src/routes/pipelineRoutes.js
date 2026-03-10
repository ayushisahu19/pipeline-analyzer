const express = require("express");
const router = express.Router();

const pipelineController = require("../controllers/pipelineController");

router.post("/pipeline", pipelineController.createRun);

router.get("/pipeline", pipelineController.getRuns);

router.get("/pipeline/summary/:branch", pipelineController.getBranchSummary);

module.exports = router;
