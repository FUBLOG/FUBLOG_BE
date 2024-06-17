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

const getAllNotification = async ({ user_id, limit = 10 }) => {
  return await notificationModel.find({ user_id }).limit(limit).lean();
};

module.exports = {
  createNewNotification,
  updateStatusRead,
  getAllNotification,
};
