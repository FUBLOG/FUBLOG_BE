"use strict";

const notificationModel = require("../model/notification.model");

const createNewNotification = async ({
  user_id,
  message,
  link,
  type,
  image,
}) => {
  return await notificationModel.create({
    user_id,
    message,
    link,
    type,
    image,
  });
};

const updateStatusRead = async ({ notificationId }) => {
  return await notificationModel.findOneAndUpdate(
    { _id: notificationId },
    { isRead: true }
  );
};

const getAllNotification = async ({ user_id, limit, page }) => {
  console.log(limit, page);
  const offset = page * limit;
  return await notificationModel
    .find({ user_id })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(offset)
    .lean();
};

const getNotificationSocket = async ({ notificationId }) => {
  return await notificationModel
    .find({ _id: notificationId })
    .populate({
      path: "user_id",
      select: "displayName",
      populate: {
        path: "userInfo",
        select: "avatar",
      },
    })
    .lean();
};

const updateStatusReadAll = async ({ userId }) => {
  return await notificationModel.updateMany(
    { user_id: userId },
    { isRead: true }
  );
};
module.exports = {
  createNewNotification,
  updateStatusRead,
  getAllNotification,
  getNotificationSocket,
  updateStatusReadAll,
};
