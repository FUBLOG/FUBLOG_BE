const express = require("express");
const router = express.Router();

router.use("/v1/api/access", require("./access"));
router.use("/v1/api/test", require("./test"));
router.use("/v1/api/user", require("./user"));
router.use("/v1/api/post", require("./post"));
<<<<<<< HEAD
=======
router.use("/v1/api/message", require("./message"));
>>>>>>> da87c34db838cea6c561f762b0beb0c6a0eff9a5
module.exports = router;

////v1/api/access
