"use strict";
const cloudinary = require("cloudinary").v2;

const cloudinaryTask = require("../core/cloudinary");
const postModel = require("../model/post.model");
const { convertToObjectId } = require("../utils");

const deleteimage = async (filesdata) => {
  for (const file of filesdata) {
    cloudinaryTask.deleteImagecloudinary(file.filename);
  }
};
const deleteOldImage = async (imagelinks) => {
  for (const path of imagelinks) {
    cloudinaryTask.deleteImagecloudinary(path);
  }
};
const findPostByUserID = async (id) => {
  const posts = postModel.find({ UserID: id });
};
const createNewPost = async (
  { tagId, content, status = "public" },
  filesData,
  userId
) => {
  const uid = userId;
  const imageLink = filesData.map((file) => file.path);
  const finalImagePaths = imageLink.length > 0 ? imageLink : [];

  return await postModel.create({
    UserID: uid,
    postTagID: tagId,
    postContent: content,
    postLinkToImages: finalImagePaths,
    postStatus: status,
  });
};
const updatePost = async (
  id,
  { postTagID, postContent, postStatus },
  filesData = []
) => {
  if (filesData?.length > 0) {
    const imageLink = filesData.map((file) => file.path);
    const finalImagePaths = imageLink?.length > 0 ? imageLink : [];
    return await postModel.findByIdAndUpdate(id, {
      postTagID,
      postContent,
      postLinkToImages: finalImagePaths,
      postStatus,
    });
  } else {
    return await postModel.findByIdAndUpdate(id, {
      postTagID,
      postContent,
      postStatus,
    });
  }
};

const findUserByPostID = async (postId) => {
  const post = await postModel
    .findOne({ _id: convertToObjectId(postId) })
    .populate({
      path: "UserID",
      model: "User",
      select: "displayName profileHash",
    })
    .lean();
  return post;
};

const findPost = async (id) => {
  return await postModel
    .findOne({
      _id: id,
    })
    .populate({
      path: "UserID",
      model: "User",
      select: "displayName profileHash",
      populate: {
        path: "userInfo",
        select: "avatar",
      },
    })
    .populate({
      path: "postTagID",
      model: "Tag",
    })
    .lean();
};

const findAllPostOfUser = async (id) => {
  return await postModel
    .find({ UserID: id })
    .populate({
      path: "UserID",
      model: "User",
      select: "displayName profileHash",
      populate: {
        path: "userInfo",
        select: "avatar",
      },
    })
    .populate({
      path: "postTagID",
      model: "Tag",
    })
    .lean();
};

module.exports = {
  createNewPost,
  deleteimage,
  deleteOldImage,
  updatePost,
  findPostByUserID,
  findUserByPostID,
  findPost,
  findAllPostOfUser,
};
