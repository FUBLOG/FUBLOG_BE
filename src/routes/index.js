const express = require("express");
const router = express.Router();
const { OK } = require("../utils/response/success.response");
router.get("/", (req, res) => {
  new OK({
    message: "Hello World",
    metadata: "welcome to my website",
  }).send(res);
});
module.exports = router;
