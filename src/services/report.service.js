const reportRepo = require('../repository/report.repo');
const UserInfo = require("../model/userInfo.model")

const createReport = async ({ sourceID, targetID, postID, reportContent, reportStatus }) => {
console.log(postID);
const newReport = await reportRepo.createReport({sourceID, targetID, postID, reportContent, reportStatus});
  return newReport;
};

module.exports = {
  createReport
};

