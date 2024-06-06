"use strict";

const { getReceiverSocketId } = require("../config/socket.config");
const { NotFoundError } = require("../core/response/error.response");
const {
  createNewNotification,
  updateStatusRead,
  getAllNotification,
} = require("../repository/notification.repo");
const { findUserById } = require("../repository/user.repo");

class NotificationService {
  notificationMethod = {
    friend: this.sendNotificationWithTypeFriend,
    system: this.sendNotificationWithTypeSystem,
    comment: this.sendNotificationWithTypeComment,
  };
  getAllNotifications = async ({ userId, limit = 10, offset = 0 }) => {
    const notifications = await getAllNotification({ user_id: userId });
    if (notifications.length === 0) {
      return [];
    }
    return notifications;
  };

  sendNotification = async ({ type = "system", link = "", user_id = "" }) => {
    // check type
    if (!["comment", "system", "friend"].includes(type)) {
      throw new NotFoundError("Invalid notification type");
    }
    // send notification
    await this.notificationMethod[type]({ link, user_id });
  };

  sendNotificationWithTypeFriend = async ({ link = "", user_id = "" }) => {
    const friendId = link;
    const friend = findUserById(friendId);
    const message = `You have a new friend request from ${friend.displayName}`;
    const notification = await createNewNotification({
      user_id,
      message,
      link,
      type: "friend",
    });
    await this.sendSocketNotification(notification);
  };

  sendNotificationWithTypeSystem = async ({ link = "", user_id = "" }) => {};

  sendNotificationWithTypeComment = async ({ link = "", user_id = "" }) => {
    const message = `Someone commented on your post`;
    const path = `https://has.io.vn/posts/${link}`;
    const notification = await createNewNotification({
      user_id,
      message,
      link: path,
      type: "comment",
    });
    await this.sendSocketNotification(notification);
  };

  sendSocketNotification = async (notification) => {
    // send notification to client
    const receiverSocketId = getReceiverSocketId(user_id);

    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("notification", notification);
    }
  };

  updateNotificationStatusRead = async ({ notificationId }) => {
    return await updateStatusRead({ notificationId });
  };
}
module.exports = new NotificationService();
