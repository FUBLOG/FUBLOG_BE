const Report = require('../model/report.model');
const Post = require('../model/post.model'); 
const {NotFoundError} = require("../core/response/error.response")

const createReport = async ({ sourceID, targetID, postID, reportContent,reportStatus }) => {
  const newReport = new Report({
    sourceID,
    targetID,
    postID,
    reportContent,
    reportStatus: "pending",
  });
  return newReport.save();
};

const getTargetID = async (postID) => {
  const post = await Post.findOne({_id:postID}).populate('UserID');
  if (!post) {
    throw new NotFoundError('Post not found');
  }
  return post.UserID;

};



module.exports = {
  createReport,
  getTargetID,

};

