const express = require('express')
const Router = express.Router()
const asyncHandler = require('express-async-handler');
const reportController = require('../../controller/report.controller');
const { authentication } = require("../../auth/authentication");

Router.get('/getareport/:id',asyncHandler(reportController.getAReport));

Router.get('/getallreports', asyncHandler(reportController.getAllReport));



Router.use(authentication);



Router.post('/createreport', asyncHandler(reportController.newReport));

Router.patch('/updatereport/:id', asyncHandler(reportController.updateReport));

Router.delete('/deletereport/:id', asyncHandler(reportController.deleteReport));

module.exports = Router