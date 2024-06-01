"use strict";

const notificationModel = require("../model/notification.model");

const createNewNotification = async ({ user_id, message, link, type }) => {
  return await notificationModel.create({ user_id, message, link, type });
};

const updateStatusRead = async ({ notificationId }) => {
  return await notificationModel.findOneAndUpdate(
    { _id: notificationId },
    { isRead: true }
  );
};

const getAllNotification = async ({ user_id, limit = 20 }) => {
  return await notificationModel.find({ user_id }).limit(limit).lean();
};
module.exports = {
  createNewNotification,
  updateStatusRead,
  getAllNotification,
};
