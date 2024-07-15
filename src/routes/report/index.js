const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const reportCtrl = require('../../controller/report.controller');
const { authentication } = require('../../auth/authentication');

router.use(authentication);

router.post('/new', asyncHandler(reportCtrl.createReport));


module.exports = router;
