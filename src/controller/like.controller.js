"user strict";
const likeService = require("../services/like.service")
const {OK} = require("../core/response/success.response")

const like = async(req,res,next) => {
   const {postID} = req.body;
   const userID = req.user.userID;
   const response = new OK({
      message:"liked",
      metadata: await likeService.like(postID,userID)
   });
   response.send(res)
}


const unlike = async (req,res,next) =>{
   const {postID} = req.body;
   const userID = req.user.userID;
   const response = new OK({
      message:"unliked",
      metadata: await likeService.unlike(postID,userID)
   });
   response.send(res)
}

const getLiked = async(req,res,next)=>{
   const {postID} = req.body;
   const userID = req.user.userID;
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