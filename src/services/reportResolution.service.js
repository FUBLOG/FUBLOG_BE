const ReportRepository = require("../repository/reportResolution.repo");

class ReportService {
  static async getAllReports() {
    const reports = await ReportRepository.getAllReports();
    return reports;
  }

  static async getReport(reportID) {
    const reports = await ReportRepository.getReport(reportID);
    return reports;
  }

  static async deleteReport(reportID) {
    const report = await ReportRepository.deleteReport(reportID);
    return report;
  }

  static async delReport(reportID) {
    const report = await ReportRepository.delReport(reportID);
    return report;
  }
}

module.exports = ReportService;
