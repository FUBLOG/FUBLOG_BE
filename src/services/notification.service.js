"use strict";

const { getReceiverSocketId } = require("../config/socket.config");
const { NotFoundError } = require("../core/response/error.response");
const {
  createNewNotification,
  updateStatusRead,
  getAllNotification,
  getNotificationSocket,
} = require("../repository/notification.repo");
const { findUserById, findUserDetailById } = require("../repository/user.repo");

class NotificationService {
  constructor() {
    this.notificationMethod = {
      friend: this.sendNotificationWithTypeFriend,
      system: this.sendNotificationWithTypeSystem,
      comment: this.sendNotificationWithTypeComment,
      like: this.sendNotificationWithTypeLike,
    };
  }
  getAllNotifications = async ({ userId, limit = 10, offset = 0 }) => {
    const notifications = await getAllNotification({ user_id: userId });
    if (notifications.length === 0) {
      return [];
    }
    return notifications;
  };

  sendNotification = async ({ type = "system", link = "", user_id = "" }) => {
    // check type
    if (!["comment", "system", "friend", "like"].includes(type)) {
      throw new NotFoundError("Invalid notification type");
    }
    // send notification
    await this.notificationMethod[type]({ link, user_id });
  };

  sendNotificationWithTypeFriend = async ({ link = "", user_id = "" }) => {
    const friendId = link;
    const friend = await findUserDetailById(friendId);
    const message = `Bạn và ${friend.displayName} Đã trở thành bạn bè`;
    const notification = await createNewNotification({
      user_id,
      message,
      link: `https://has.io.vn/profile/${friend.profileHash}`,
      type: "friend",
      image: friend?.userInfo?.avatar,
    });
    await this.sendSocketNotification(user_id, notification._id);
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

  sendNotificationWithTypeLike = async ({ link = "", user_id = "" }) => {
    const message = `Someone liked your post`;
    const path = `https://has.io.vn/posts/${link}`;
    const notification = await createNewNotification({
      user_id,
      message,
      link: path,
      type: "like",
    });
    await this.sendSocketNotification(notification._id);
  };

  sendSocketNotification = async (userId, notificationId) => {
    // send notification to client
    const receiverSocketId = getReceiverSocketId(userId);

    if (receiverSocketId) {
      const notification = await getNotificationSocket({
        notificationId,
      });
      io.to(receiverSocketId).emit("notification", notification);
    }
  };

  updateNotificationStatusRead = async ({ notificationId }) => {
    return await updateStatusRead({ notificationId });
  };
}
module.exports = new NotificationService();
