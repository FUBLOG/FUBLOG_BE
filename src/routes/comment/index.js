const express = require("express")
const commentController = require("../../controller/comment.controller")
const router = express.Router()
const asyncHandler = require('express-async-handler')
const {authentication} = require("../../auth/authentication")

router.use(authentication);

router.post("/addComment",asyncHandler(commentController.addComment))
router.get("/getComments", asyncHandler(commentController.getComments))
router.put("/updateComments", asyncHandler(commentController.updateComment))
router.delete("/deleteComment", asyncHandler(commentController.deleteComment))
router.get("/getCommentPost", asyncHandler(commentController.getCommentPost));


module.exports = router;
