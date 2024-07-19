const Report = require('../model/report.model');
const {NotFoundError} = require("../core/response/error.response");
const postModel = require('../model/post.model');

const createReport = async ({ sourceID, targetID, postID, reportContent }) => {
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
  const post = await postModel.findOne({_id:postID}).populate('UserID');
  if (!post) {
    throw new NotFoundError('Post not found');
  }
  return post.UserID;

};



module.exports = {
  createReport,
  getTargetID,

};

