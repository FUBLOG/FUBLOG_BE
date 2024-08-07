const express = require("express");
const ReportController = require("../../../controller/reportResolution.controller");
const { authentication } = require("../../../auth/authentication");
const router = express.Router();

router.use(authentication);

router.get("/", ReportController.getAllReports);
router.get("/report", ReportController.getReport);
router.post("/safe", ReportController.deleteReport);
router.post("/del", ReportController.delReport);

module.exports = router;
