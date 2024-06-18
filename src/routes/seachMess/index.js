const express = require("express");
const router = express.Router();
const asyncHandler = require ("express-async-handler");
const searchMess = require("../../controller/searchMess.controller") 

router.get("/searchMess",asyncHandler(searchMess.searchMess))

module.exports = router;