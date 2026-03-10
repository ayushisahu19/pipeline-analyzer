const express = require("express");
const router = express.Router();
const controller = require("../controllers/pipelineController");

router.post("/pipeline", controller.createRun);

router.get("/pipeline", controller.getRuns);

router.get("/pipeline/summary/:branch", controller.getBranchSummary);

module.exports = router;