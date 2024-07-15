const reportService = require('../services/report.service');
const { OK } = require('../core/response/success.response');
const reportRepo = require("../repository/report.repo")

const createReport = async (req, res, next) => {
  const sourceID = req.user.userId; 
  const {postID, reportContent,reportStatus } = req.body;
  const targetID = await reportRepo.getTargetID(postID); 
  const response =  new OK({
    message:"create new report",
    metadata:  await reportService.createReport({
        sourceID,
        targetID,
        postID,
        reportContent,
        reportStatus
      })
  })
  response.send(res)
};

module.exports = {
  createReport

};
