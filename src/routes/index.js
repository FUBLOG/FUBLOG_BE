const express = require("express");
const router = express.Router();

router.use("/v1/api/access", require("./access"));
router.use("/v1/api/test", require("./test"));
router.use("/v1/api/user", require("./user"));
module.exports = router;
