const express = require("express");
const router = express.Router();
const asyncHandler = require('express-async-handler');
const searchCtrl = require("../../controller/search.controller");
const {authentication} = require("../../auth/authentication")

router.post("/searchUser", asyncHandler(searchCtrl.searchUser));
router.use(authentication);
router.post("/searchMess", asyncHandler(searchCtrl.searchMess));


module.exports = router;
