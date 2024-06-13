const express = require("express");
const router = express.Router();

router.use("/access", require("./access"));
router.use("/user", require("./user"));



// Post API Router
router.use("/post", require("./post"));
// PostTag API Router
router.use("/posttag", require("./postTag"));
// Report API Router
router.use("/report", require("./report"));
// Report 
router.use("/userinfo", require("./userInfo"));
router.use("/comment", require("./comment"));
router.use("/message", require("./comment"));
router.use("/searchUser",require("./searchUser"))
router.use("/notification", require("./notification"));
router.use("/addFriend", require("./addFriend"));
module.exports = router;

