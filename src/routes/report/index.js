const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler');
const reportController = require('../../controller/report.controller');
const { authentication } = require("../../auth/authentication");

router.get('/getareport/:id',asyncHandler(reportController.getAReport));

router.get('/getallreports', asyncHandler(reportController.getAllReport));



router.use(authentication);



router.post('/createreport', asyncHandler(reportController.newReport));

router.patch('/updatereport/:id', asyncHandler(reportController.updateReport));

router.delete('/deletereport/:id', asyncHandler(reportController.deleteReport));


module.exports = router