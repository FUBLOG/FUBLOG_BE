const { NotFoundError } = require("../core/response/error.response");
const Comment = require("../model/comment.model");
const updateCommentCount = require("../repository/comment.repo");
const { convertToObjectId } = require("../utils");
const Post = require("../model/post.model");
const { path } = require("../app");
const commentRepo = require("../repository/comment.repo");
const notificationService = require("./notification.service");

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
    notificationService.sendNotification({
      type: "comment",
      payload: {
        commenterId: comment_userId,
        commentId: comment._id,
        postId: comment_postID,
      },
    });
    await commentRepo.updateCommentCount(comment_postID, 1);
    return comment;
  }
  static async getComments({ parent_CommentID, limit = 10, offset = 0 }) {
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
        .populate({
          path: "comment_userId",
          model: "User",
          select: "displayName profileHash",
          populate: {
            path: "userInfo",
            model: "UserInfo",
            select: "avatar",
          },
        })
        .limit(limit)
        .skip(offset)
        .sort({ comment_left: 1 })
        .lean();
      return comments;
    } else {
      const comments = await Comment.find({
        comment_postID: convertToObjectId(parent.comment_postID),
        comment_parentId: null,
      })
        .populate({
          path: "comment_userId",
          model: "User",
          select: "displayName profileHash",
          populate: {
            path: "userInfo",
            model: "UserInfo",
            select: "avatar",
          },
        })
        .limit(limit)
        .skip(offset)
        .sort({ comment_left: 1 })
        .lean();
      return comments;
    }
  }

  static async updateComment({ parent_CommentID, comment_content }) {
    const comment = await Comment.findById(parent_CommentID);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    comment.comment_content = comment_content;
    comment.updatedAt = new Date();
    await comment.save();

    return comment;
  }

  static async deleteComment({ parent_CommentID, comment_postID }) {
    const comment = await Comment.findById(parent_CommentID);
    console.log(comment);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    const leftValue = comment.comment_left;
    const rightValue = comment.comment_right;
    const width = rightValue - leftValue + 1;

    const commentsToDelete = await Comment.find({
      comment_left: { $gte: leftValue },
      comment_right: { $lte: rightValue },
    }).lean();

    await Comment.deleteMany({
      comment_left: { $gte: leftValue },
      comment_right: { $lte: rightValue },
    });

    await Comment.updateMany(
      { comment_right: { $gt: rightValue } },
      { $inc: { comment_right: -width } }
    );

    await Comment.updateMany(
      { comment_left: { $gt: rightValue } },
      { $inc: { comment_left: -width } }
    );
    await commentRepo.updateCommentCount(comment_postID, -1);
    return commentsToDelete;
  }

  static async getCommentPost({ postID, limit = 10, offset = 0 }) {
    if (!postID) {
      throw new NotFoundError("postID not found");
    }

    const comments = await Comment.find({
      comment_postID: convertToObjectId(postID),
      parent_CommentID: null,
    })
      .populate({
        path: "comment_userId",
        model: "User",
        select: "displayName profileHash",
        populate: {
          path: "userInfo",
          model: "UserInfo",
          select: "avatar",
        },
      })
      .limit(limit)
      .skip(offset)
      .sort({ comment_left: 1 })
      .lean();

    return comments;
  }
}

module.exports = CommentService;
