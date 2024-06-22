const express = require("express");
const router = express.Router();

router.use("/access", require("./access"));
router.use("/user", require("./user"))
router.use("/auth", require("./auth"));
router.use("/post", require("./post"));
router.use("/tag", require("./tag"));
router.use("/report", require("./report"));
router.use("/profile", require("./profile"));
router.use("/comment", require("./comment"));
router.use("/message", require("./message"));
router.use("/search", require("./search"));
router.use("/notification", require("./notification"));
router.use("/friend", require("./friend"));
<<<<<<< HEAD
router.use("/likePost",require("./like"))
=======
router.use("/conversation", require("./conversation"));
router.use("/newfeed", require("./newfeed"));
>>>>>>> 9f585e20e3c57242eb95672bf5622f8f37f7f004
module.exports = router;
