const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const searchCtrl = require("../../controller/search.controller");

router.post("/user", asyncHandler(searchCtrl.searchUser));
router.post("/mess", asyncHandler(searchCtrl.searchMess));


module.exports = router;
