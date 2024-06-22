const postModel = require("../model/post.model");
const userModel = require("../model/user.model");

const getAllLiked = async (userID) => {
   const likedPosts = await postModel
   .find({ likes: userID }) 
   .populate({
     path: "likes", 
     select: "displayName profileHash", 
     model: userModel 
   })
   .lean();

 return likedPosts;
};

module.exports = {
  getAllLiked
};
