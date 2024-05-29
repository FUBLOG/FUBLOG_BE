const express = require("express")
const commentController = require("../../controller/comment.controller")
const router = express.Router()
const asyncHandler = require('express-async-handler')
const auth = require("../../auth/authentication")

router.use(auth);

router.post("/addComment",asyncHandler(commentController.addComment))
router.get("/getComments", asyncHandler(commentController.getComments))
router.put("/updateComments", asyncHandler(commentController.updateCmt))
router.delete("/deleteComment", asyncHandler(commentController.deleteComment))

module.exports = router;
