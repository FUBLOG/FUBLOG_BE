"use strict";
const { NotFoundError } = require("../core/response/error.response");
const Comment = require("../model/comment.model");
const { findOneProduct } = require("../repository/product.repo");
const { convertToObjectId } = require("../utils");

class CommentService {
  static async addComment({
    postID,
    userId,
    content,
    parent_CommentID = null,
  }) {
    const comment = new Comment({
      comment_postID: postID,
      comment_userId: userId,
      comment_content: content,
      parent_CommentID,
    });
    let rightValue;
    if (parent_CommentID) {
      const parentComment = await Comment.findById(parent_CommentID);
      if (!parentComment) {
        throw new NotFoundError("Parent comment not found");
      }
      rightValue = parentComment.comment_right;
      await Comment.updateMany(
        {
          comment_right: { $gte: rightValue },
        },
        {
          $inc: { comment_right: 2 },
        }
      );
      await Comment.updateMany(
        {
          comment_left: { $gt: rightValue },
        },
        {
          $inc: { comment_left: 2 },
        }
      );
    } else {
      const maxRightValue = await Comment.findOne(
        {
          comment_postID: convertToObjectId(postID),
        },
        "comment_right"
      ).sort({ comment_right: -1 });
      if (maxRightValue) {
        rightValue = maxRightValue.comment_right + 1;
      } else {
        rightValue = 1;
      }
    }
    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;
    await comment.save();
    return comment;
  }
  static async getComments({
    postID,
    parentCommentId,
    limit = 10,
    offset = 0,
  }) {
    if (parentCommentId) {
      const parent = await Comment.findById(parentCommentId);
      if (!parent) {
        throw new NotFoundError("Parent comment not found");
      }
      const comments = await Comment.find({
        comment_postID: convertToObjectId(postID),
        comment_left: { $gt: parent.comment_left },
        comment_right: { $lt: parent.comment_right },
      })
        .limit(limit)
        .skip(offset)
        .select({
          comment_content: 1,
          comment_parentId: 1,
          comment_left: 1,
          comment_right: 1,
        })
        .sort({ comment_left: 1 })
        .lean();
      return comments;
    } else {
      const comments = await Comment.find({
        comment_postID: convertToObjectId(postID),
        comment_parentId: null,
      })
        .limit(limit)
        .skip(offset)
        .select({
          comment_content: 1,
          comment_parentId: 1,
          comment_left: 1,
          comment_right: 1,
        })
        .sort({ comment_left: 1 })
        .lean();
      return comments;
    }
  }
  static async deleteComment({ commentId, postID }) {
    const foundProduct = await findOneProduct({
      product_id: convertToObjectId(postID),
    });
    if (!foundProduct) {
      throw new NotFoundError("Product not found");
    }
    // determine left and right value of comment
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }
    const leftValue = comment.comment_left;
    const rightValue = comment.comment_right;
    // determine width of comment
    const width = rightValue - leftValue + 1;
    // delete all comments children of comment
    await Comment.deleteMany({
      comment_postID: convertToObjectId(postID),
      comment_left: { $gte: leftValue, $lte: rightValue },
    });
    await Comment.updateMany(
      {
        comment_postID: convertToObjectId(postID),
        comment_right: { $gt: rightValue },
      },
      {
        $inc: { comment_right: -width },
      }
    );
    await Comment.updateMany(
      {
        comment_postID: convertToObjectId(postID),
        comment_left: { $gt: rightValue },
      },
      {
        $inc: { comment_left: -width },
      }
    );
  }
}
module.exports = CommentService;
