const express = require("express");
const router = express.Router();

router.use("/access", require("./access"));
router.use("/user", require("./user"));
<<<<<<< HEAD

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
=======
router.use("/auth", require("./auth"));
router.use("/post", require("./post"));
router.use("/tag", require("./tag"));
router.use("/report", require("./report"));
router.use("/profile", require("./profile"));
router.use("/comment", require("./comment"));
router.use("/message", require("./message"));
router.use("/searchUser", require("./searchUser"));
>>>>>>> 69a181d6a4344f04bc012c09af9a6f764af2ed89
router.use("/notification", require("./notification"));
router.use("/addFriend", require("./addFriend"));
module.exports = router;
