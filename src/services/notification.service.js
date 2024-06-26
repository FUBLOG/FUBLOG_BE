"use strict";

const { getReceiverSocketId } = require("../config/socket.config");
const { NotFoundError } = require("../core/response/error.response");
const {
  createNewNotification,
  updateStatusRead,
  getAllNotification,
  getNotificationSocket,
  updateStatusReadAll,
  isExistNotification,
  updateNotification,
} = require("../repository/notification.repo");
const { findUserByPostID } = require("../repository/post.repo");
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

  getAllNotifications = async ({ userId, limit, page }) => {
    const notifications = await getAllNotification({
      user_id: userId,
      limit,
      page,
    });
    if (notifications.length === 0) {
      return [];
    }
    return notifications;
  };

  sendNotification = async ({ type = "system", payload }) => {
    // check type
    if (!["comment", "system", "friend", "like"].includes(type)) {
      throw new NotFoundError("Invalid notification type");
    }
    // send notification
    await this.notificationMethod[type](payload);
  };

  sendNotificationWithTypeFriend = async ({ friendId = "", user_id = "" }) => {
    const friend = await findUserDetailById(friendId);
    const message = `Bạn và ${friend.displayName} Đã trở thành bạn bè`;
    const notification = await createNewNotification({
      user_id,
      message,
      payload: {
        profileHash: friend?.profileHash,
      },
      type: "friend",
      image: friend?.userInfo?.avatar,
    });
    await this.sendSocketNotification(user_id, notification._id);
  };

  sendNotificationWithTypeSystem = async ({ link = "", user_id = "" }) => {};

  sendNotificationWithTypeComment = async ({
    commenterId = "",
    commentId = "",
    postId = "",
  }) => {
    const post = await findUserByPostID(postId);
    console.log("post",post);
    const userComment = await findUserDetailById(commenterId);
    
    let notification = await isExistNotification({
      user_id: post?.UserID?._id,
      payload: {
        postId,
      },
      type: "comment",
    });
    if (notification) {
      if (notification?.payload?.lastComment === commentId) {
        await updateNotification(
          { notificationId: notification?._id },
          {
            payload: {
              ...notification?.payload,
              commentId,
            },
          }
        );
      } else {
        const message = `${userComment?.displayName}và những người khác đã bình luận vào bài viết của bạn`;
        await updateNotification(notification?._id, {
          message,
          payload: {
            ...notification?.payload,
            lastComment: userComment?._id,
            commentId: commentId,
          },
        });
      }
    } else {
      const message = `${userComment?.displayName} đã bình luận vào bài viết của bạn`;
      notification = await createNewNotification({
        user_id: post?.UserID?._id,
        message,
        payload: {
          commentId,
          postId,
          lastComment: userComment?._id,
        },
        type: "comment",
      });
    }
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

  updateNotificationStatusReadAll = async ({ userId }) => {
    return await updateStatusReadAll({ userId });
  };
}
module.exports = new NotificationService();
