const Report = require("../model/report.model");
const { NotFoundError } = require("../core/response/error.response");
const postModel = require("../model/post.model");
const { findDelete } = require("./newfeed.repo");

class ReportRepository {
  static async getAllReports() {
    const reports = await Report.find().select(
      "_id sourceID targetID postId reportContent reportStatus createdAt updatedAt"
    );
    if (!reports) throw new NotFoundError("report not found");
    return reports;
  }

  static async getReport(id) {
    const report = await Report.findById(id).select(
      "_id sourceID targetID postID reportContent reportStatus createdAt updatedAt"
    );

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

  static async delReport(id) {
    const report = await Report.findOneAndDelete({
      _id: id,
    });
    if (!report) {
      throw new NotFoundError("Report not found");
    }
    const deletePost = await postModel.findOneAndDelete({
      _id: report.postID,
    });
    const newFeedDelete = await findDelete(report.postID);
    return report;
  }
}

module.exports = ReportRepository;
