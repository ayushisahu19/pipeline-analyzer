const express = require("express");
const router = express.Router();

const {
    createRun,
    getRuns,
    getBranchSummary
} = require("../controllers/pipelineController");

router.post("/pipeline", createRun);
router.get("/pipeline", getRuns);
router.get("/pipeline/summary/:branch", getBranchSummary);

module.exports = router;