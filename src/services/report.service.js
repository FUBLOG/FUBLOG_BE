const reportRepo = require('../repository/report.repo');
const UserInfo = require("../model/userInfo.model")

const createReport = async ({ sourceID, targetID, postID, reportContent }) => {
const newReport = await reportRepo.createReport({sourceID, targetID, postID, reportContent});
  return newReport;
};

module.exports = {
  createReport
};

