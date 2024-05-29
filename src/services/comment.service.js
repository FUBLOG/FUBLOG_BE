"use strict";
const { NotFoundError } = require("../core/response/error.response");
const Comment = require("../model/comment.model");
const { findOnePost } = require("../repository/post.repo");
const { convertToObjectId } = require("../utils");

class CommentService {
  static async addComment({
    comment_postID,
    comment_userId,
    comment_content,
    parent_CommentID = null,
  }) {
    const comment = new Comment({
      comment_postID: comment_postID,
      comment_userId: comment_userId,
      comment_content: comment_content,
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
          comment_postID: convertToObjectId(comment_postID),
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
    parent_CommentID,
    limit = 10,
    offset = 0,
  }) {
    if (parent_CommentID) {
      const parent = await Comment.findById(parent_CommentID);
      if (!parent) {
        throw new NotFoundError("Parent comment not found");
      }
      const comments = await Comment.find({
        comment_postID: convertToObjectId(parent.comment_postID),
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
        comment_postID: convertToObjectId(parent.comment_postID),
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

   static async updateComment({ 
    commentId, 
    comment_content 
  }) {
    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    // Update the comment content
    comment.comment_content = comment_content;
    comment.updatedAt = new Date();

    // Save the updated comment
    await comment.save();

    return comment;
  }
  static async deleteComment({ 
    commentId,
    comment_postID 
  }) {
    const foundPost = await findOnePost({
      post_id: convertToObjectId(comment_postID),
    });
    if (!foundPost) {
      throw new NotFoundError("Post not found");
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
      comment_postID: convertToObjectId(comment_postID),
      comment_left: { $gte: leftValue, $lte: rightValue },
    });
    await Comment.updateMany(
      {
        comment_postID: convertToObjectId(comment_postID),
        comment_right: { $gt: rightValue },
      },
      {
        $inc: { comment_right: -width },
      }
    );
    await Comment.updateMany(
      {
        comment_postID: convertToObjectId(comment_postID),
        comment_left: { $gt: rightValue },
      },
      {
        $inc: { comment_left: -width },
      }
    );
  }
}
module.exports = CommentService;
