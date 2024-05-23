const express = require("express");
const router = express.Router();

router.use("/v1/api/access", require("./access"));
router.use("/v1/api/test", require("./test"));
router.use("/v1/api/user", require("./user"));
router.use("/v1/api/post", require("./post"));
module.exports = router;

////v1/api/access
