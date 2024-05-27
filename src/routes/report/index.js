const express = require('express')
const Router = express.Router()
const asyncHandler = require('express-async-handler');
const reportController = require('../../controller/report.controller');

Router.post('/createreport', asyncHandler(reportController.newReport));

Router.get('/:id',asyncHandler(reportController.getAReport));

Router.get('/', asyncHandler(reportController.getAllReport));

Router.patch('/:id', asyncHandler(reportController.updateReport));

Router.delete('/:id', asyncHandler(reportController.deleteReport));

module.exports = Router