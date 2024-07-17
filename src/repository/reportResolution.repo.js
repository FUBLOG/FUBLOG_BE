const Report = require("../model/report.model");
const { NotFoundError } = require("../core/response/error.response");

class ReportRepository {
  static async getAllReports() {
    const reports = await Report.find()
      .select("_id sourceID targetID postId reportContent reportStatus createdAt updatedAt");
    if (!reports) throw new NotFoundError("report not found");
    return reports;
  }

  static async getReport(id) {
    const report = await Report.findById(id)
      .select("_id sourceID targetID postID reportContent reportStatus createdAt updatedAt");

    if (!report) {
      throw new NotFoundError("Report not found");
    }

    return report;
  }

  static async deleteReport(id) {
    const report = await Report.findByIdAndDelete(id);
    if (!report) {
      throw new NotFoundError("Report not found");
    }

    return report;
  }
}

module.exports = ReportRepository;
