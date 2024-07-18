const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { authentication } = require("../../auth/authentication");
const stttCtrl = require("../../controller/statistics.controller");

router.use(authentication);

router.get('/', asyncHandler(stttCtrl.getSttt));
router.get('/mon', asyncHandler(stttCtrl.getMonSttt));

module.exports = router;
