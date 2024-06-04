"use strict";
const { OK } = require("../core/response/success.response");
const notificationService = require("../services/notification.service");
class NotificationController {
  getAllNotifications = async (req, res) => {
    const { userId } = req.user;
    const { limit, offset } = req.query;
    const response = new OK({
      message: "Get all notifications",
      metadata: notificationService.getAllNotifications({
        userId,
        limit,
        offset,
      }),
    });
    response.send(res);
  };
  updateStatusRead = async (req, res) => {
    const { notificationId } = req.params;
    await notificationService.updateStatusRead({ notificationId });
    const response = new OK({
      message: "Update status read successfully",
    });
    response.send(res);
  };
}
module.exports = new NotificationController();