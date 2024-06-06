const express = require("express");
const router = express.Router();

router.use("/access", require("./access"));
router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/posttag", require("./postTag"));
router.use("/report", require("./report"));
router.use("/userinfo", require("./userInfo"));
router.use("/message", require("./message"));
router.use("/notification", require("./notification"));
router.use("/comment", require("./comment"));
router.use('/auth', require('./auth'));
module.exports = router;
