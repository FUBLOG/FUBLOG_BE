"user strict";
const likeService = require("../services/like.service")
const {OK,NO_CONTENT} = require("../core/response/success.response")

const like = async(req,res,next) => {
   const {postID} = req.body;
   const userID = req.user.userId;
   const response = new NO_CONTENT({
      message:"liked",
      metadata: await likeService.like(postID,userID)
   });
   response.send(res)
}


const unlike = async (req,res,next) =>{
   const {postID} = req.body;
   const userID = req.user.userId;
   const response = new NO_CONTENT({
      message:"unliked",
      metadata: await likeService.unlike(postID,userID)
   });
   response.send(res)
}

const getLiked = async(req,res,next)=>{
   const {postID} = req.body;
   const userID = req.user.userId;
   const response = new OK({
      message:"listed liked",
      metadata:await likeService.getLiked(userID,postID)
   });
   response.send(res)
}

module.exports = {
   like,
   unlike,
   getLiked,
}