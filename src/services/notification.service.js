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
      image: [friend?.userInfo?.avatar],
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
    const userComment = await findUserDetailById(commenterId);

    let notification = await isExistNotification({
      user_id: post?.UserID?._id,
      "payload.postId": postId,
      type: "comment",
    });
    if (notification) {
      await this.handleCommentNotificationExist({
        notification,
        commentId,
        userComment,
      });
    } else {
      const message = `${userComment?.displayName} đã bình luận vào bài viết của bạn`;
      notification = await createNewNotification({
        user_id: post?.UserID?._id,
        message,
        payload: {
          commentId,
          postId,
          lastComment: userComment?._id,
          commentList: [userComment?._id],
        },
        image: [userComment?.userInfo?.avatar],
        type: "comment",
      });
    }
    await this.sendSocketNotification(post?.UserID?._id, notification._id);
  };

  sendNotificationWithTypeLike = async ({ post, userID }) => {
    let notification = await isExistNotification({
      user_id: userID,
      "payload.postId": post?._id,
      type: "like",
    });
    const user = await findUserDetailById(userID);
    if (notification) {
      const userLikesCount = post?.likes?.length - 1;
      const message = `${user?.displayName} và ${userLikesCount} người khác đã thích bài viết của bạn`;
      await updateNotification(notification?._id, {
        message,
        image: [user?.userInfo?.avatar],
      });
    } else {
      const message = `${user?.displayName} đã thích bài viết của bạn`;
      notification = await createNewNotification({
        user_id: post?.UserID,
        message,
        payload: {
          postId: post?._id,
        },
        image: [user?.userInfo?.avatar],
        type: "like",
      });
    }
    await this.sendSocketNotification(post?.UserID,notification._id);
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

  handleCommentNotificationExist = async ({
    notification,
    commentId,
    userComment,
  }) => {
    const isCommented = await this.checkIsCommented({
      notification,
      userComment,
    });
    if (isCommented) {
      //move image to top
      const index = notification.image.indexOf(userComment?.userInfo?.avatar);
      const newImage = notification.image.splice(index, 1);
      newImage.push(userComment?.userInfo?.avatar);
      await updateNotification(notification?._id, {
        image: newImage,
      });
    } else {
      notification.image.push(userComment?.userInfo?.avatar);
      notification = await updateNotification(notification?._id, {
        image: notification.image,
        "payload.commentList": [
          ...notification.payload.commentList,
          userComment?._id,
        ],
      });
    }
    const message = `${userComment?.displayName} và những người khác đã bình luận vào bài viết của bạn`;
    await updateNotification(notification?._id, {
      message,
      payload: {
        ...notification?.payload,
        lastComment: userComment?._id,
        commentId: commentId,
      },
    });
  };

  checkIsCommented = async ({ notification, userComment }) => {
    const list = notification?.payload?.commentList;
    for (const item of list) {
      if (item.toString() === userComment?._id.toString()) {
        return true; // This will now correctly return from checkIsCommented
      }
    }
    return false; // Returns false if no match is found
  };
}
module.exports = new NotificationService();
