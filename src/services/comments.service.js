"use strict";
const { NotFoundError } = require("../core/response/error.response");
const Comment = require("../model/comment.model");
const { findOneProduct } = require("../repository/product.repo");
const { convertToObjectId } = require("../utils");

const convertToObjectId = (string) => {
  return new mongoose.Types.ObjectId(string);
};
// create cmt
const createCmt = async (postID, userID, parentCommentID, content) => {
  const newCmt = new Comment({postID:convertToObjectId(postID),userID:convertToObjectId(userID),parentCommentID,content});
  await newCmt.save();
  return newCmt

};
// get cmt
const getCmt = async (commentID) => {
  const comment = await Comment.findById(commentID);
  if (!comment) {
    throw new Error('cmt k ton tai');
  }
  return comment;
};

// update cmt
const updateCmt = async (commentID, content) => {
  const comment = await Comment.findByIdAndUpdate(commentID, { content });
  if (!comment) {
    throw new Error('cmt k ton tai');
  }
  return comment;
};

// xoa cmt
const deleteCmt = async (commentID) => {
  await Comment.findByIdAndDelete(commentID);
};

module.exports = {createCmt,getCmt,updateCmt,deleteCmt};
