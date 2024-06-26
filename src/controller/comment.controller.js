const { OK } = require("../core/response/success.response");
const commentService = require("../services/comment.service");

// create cmt
const addComment = async (req, res) => {
  const userId = req.user.userId;
  const { comment_postID, comment_content, parent_CommentID = null } = req.body;
  const response = new OK({
    message: "...",
    metadata: await commentService.addComment({
      comment_content,
      comment_postID,
      comment_userId: userId,
      parent_CommentID,
    }),
  });
  response.send(res);
};

// get cmt
const getComments = async (req, res) => {
  const { parent_CommentID } = req.query;
  const response = new OK({
    message: "listed all child comment",
    metadata: await commentService.getComments({ parent_CommentID }),
  });
  response.send(res);
};

// update cmt
const updateComment = async (req, res) => {
  const { comment_content, parent_CommentID = null } = req.body;
  const response = new OK({
    message: "Comment updated",
    metadata: await commentService.updateComment({
      parent_CommentID,
      comment_content,
    }),
  });
  response.send(res);
};

const deleteComment = async (req, res) => {
  const { parent_CommentID, comment_postID } = req.body;
  const response = new OK({
    message: "Comment deleted",
    metadata: await commentService.deleteComment({
      parent_CommentID,
      comment_postID,
    }),
  });
  response.send(res);
};

const getCommentPost = async (req, res) => {
  const { comment_postId } = req.query;
  const comments = await commentService.getCommentPost({
    postID: comment_postId,
  }); // Pass the comment_postId to the service function
  const response = new OK({
    message: "Listed all comments",
    metadata: comments,
  });
  res.json(response); // Send the response
};

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment,
  getCommentPost,
};
