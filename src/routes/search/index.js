const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const searchCtrl = require("../../controller/search.controller");

router.get("/searchUser", asyncHandler(searchCtrl.searchUser));
router.get("/searchMess", asyncHandler(searchCtrl.searchMess));


module.exports = router;
