const express = require("express");
const router = express.Router();

router.use("/v1/api/access", require("./access"));
router.use("/v1/api/test", require("./test"));
router.use("/v1/api/user", require("./user"));
router.use("/v1/api/post", require("./post"));
router.use("/v1/api/message", require("./message"));
router.use("/v1/api/comment", require("./comment"));
router.use("/v1/api/addFriend", require("./addFriend"));

module.exports = router;

////v1/api/access
