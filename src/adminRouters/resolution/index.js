const express = require("express");
const ReportController = require("../../controller/reportResolution.controller");
const {authentication} = require("../../auth/authentication")
const router = express.Router();

router.use(authentication);

router.get("/", ReportController.getAllReports);
router.get("/report", ReportController.getReport);
router.delete("/", ReportController.deleteReport);


module.exports = router;
