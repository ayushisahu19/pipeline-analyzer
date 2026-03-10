const express = require("express");
const router = express.Router();
const pipelineController = require("../controllers/pipelineController");
const {
    createRun,
    getRuns,
    getBranchSummary
} = require("../controllers/pipelineController");

router.post("/pipeline", createRun);
router.get("/pipeline", getRuns);
router.get("/pipeline/summary/:branch", getBranchSummary);
router.get("/compare", pipelineController.compareBranches);

module.exports = router;