const express = require("express");
const { apiKey, permissions } = require("../../auth/authentication");
const router = express.Router();

router.use(apiKey);

//check Permissions
router.use(permissions("1024"));

router.use("/statistics", require("./statistics"));
router.use("/resolution", require("./resolution"));

module.exports = router;
