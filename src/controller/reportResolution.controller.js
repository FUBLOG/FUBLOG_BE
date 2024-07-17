const ReportService = require("../services/reportResolution.service");
const { OK, NO_CONTENT } = require("../core/response/success.response");

const getAllReports = async (req, res, next) => {
  const response = new OK({
    message: "got all reports",
    metadata: await ReportService.getAllReports(),
  });
  response.send(res);
};

const getReport = async (req, res, next) => {
  const { reportID } = req.body;

  const response = new OK({
    message: "got the report",
    metadata: await ReportService.getReport(reportID),
  });
  response.send(res);
};

const deleteReport = async (req, res, next) => {
  const { reportID } = req.body;

  await ReportService.deleteReport(reportID);
  
  const response = new NO_CONTENT({
    message: "deleted the report",
  });
  response.send(res);
};

module.exports = { getAllReports, getReport, deleteReport };
