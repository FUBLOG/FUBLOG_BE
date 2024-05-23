const express = require("express")
const commentController = require("../controller/comment.controller")
const router = express.Router()

router.post("/createCmt", commentController.createCmt)
router.get("/getCmt", commentController.getCmt)
router.put("/updateCmt", commentController.updateCmt)
router.delete("/deleteCmt", commentController.deleteCmt)

module.exports = router;
