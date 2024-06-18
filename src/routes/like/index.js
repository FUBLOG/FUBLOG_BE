"user strick"
const express = require ("express")
const router = express.Router();
const likeController = require("../../controller/like.controller")
const asyncHandler = require("express-async-handler")
const {authentication} = require("../../auth/authentication")

router.use(authentication);
router.post("/like",asyncHandler(likeController.like))
router.post("/unlike",asyncHandler(likeController.unlike))
router.get("/getLiked",asyncHandler(likeController.getLiked))

module.exports = router;