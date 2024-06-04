const express = require("express");
const router = express.Router();

router.use("/v1/api/access", require("./access"));
router.use("/v1/api/test", require("./test"));
router.use("/v1/api/user", require("./user"));



// Post API Router
router.use("/v1/api/post", require("./post"));
// PostTag API Router
router.use("/v1/api/posttag", require("./postTag"));
// Report API Router
router.use("/v1/api/report", require("./report"));
// Report 
router.use("/v1/api/userinfo", require("./userInfo"));


router.use("/v1/api/message", require("./message"));
module.exports = router;

////v1/api/access
