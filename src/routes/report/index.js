const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler');
const reportController = require('../../controller/report.controller');
const {authentication} = require("../../auth/authentication")

router.get('/getReport/:id',asyncHandler(reportController.getAReport));

router.get('/getAllReports', asyncHandler(reportController.getAllReport));

router.use(authentication);

router.post('/createReport', asyncHandler(reportController.newReport));

router.patch('/updateReport/:id', asyncHandler(reportController.updateReport));

router.delete('/deleteReport/:id', asyncHandler(reportController.deleteReport));

module.exports = router
module.exports = router