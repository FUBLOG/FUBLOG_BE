const express = require("express");
const router = express.Router();

router.use("/access", require("./access"));
router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/post", require("./post"));
router.use("/tag", require("./tag"));
router.use("/report", require("./report"));
router.use("/profile", require("./profile"));
router.use("/comment", require("./comment"));
router.use("/message", require("./message"));
router.use("/searchUser", require("./searchUser"));
router.use("/notification", require("./notification"));
router.use("/addFriend", require("./addFriend"));
module.exports = router;
