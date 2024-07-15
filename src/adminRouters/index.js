const express = require("express");
const router = express.Router();

router.use("/statistics",require("./statistics"));
router.use("/resolution",require("./resolution"))


module.exports = router;
