const express = require("express")
const commentController = require("../../controller/comment.controller")
const router = express.Router()
const asyncHandler = require('express-async-handler')
router.post("/addComment",commentController.addComment)
router.get("/getComments", asyncHandler(commentController.getComments))
router.put("/updateComments", commentController.updateCmt)
router.delete("/deleteComment", commentController.deleteComment)

module.exports = router;
