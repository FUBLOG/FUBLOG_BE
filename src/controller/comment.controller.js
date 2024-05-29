const { OK } = require("../core/response/success.response");
const commentService = require("../services/comment.service")

// create cmt
const addComment = async (req, res) => {
  const { comment_postID, comment_userId, parent_CommentID, comment_contentntent } = req.body

  try {
    const newCmt = await commentService.addComment(req.body);
    res.status(201).json({
      message: '',
      comment: newCmt,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }addComment
};

// get cmt
const getComments = async (req, res) => {
  const { parent_CommentID } = req.query;
  console.log(req.query);
  const response = new OK({
    message:"...",
    metadata: await commentService.getComments({parent_CommentID})
  })
  response.send(res);
};

// update cmt
const updateComment = async (req, res) => {
  const { commentId } = req.query;
  const { comment_content } = req.body;

  const updatedComment = await commentService.updateComment({ commentId, comment_content });

  const response = new OK({
    message: "Comment updated",
    metadata: updatedComment,
  });
  response.send(res);
};

//delete cmt
const commentService = require('../services/comment.service'); // Adjust the path as necessary
const { OK } = require('../utils'); // Assuming you have this utility

const deleteComment = async (req, res) => {
  const { commentId, comment_postID } = req.query;
  console.log(req.query);
  const response = new OK({
    message: "Comment deleted",
    metadata: await commentService.deleteComment({ commentId, comment_postID }),
  });
  response.send(res);
};

 
 module.exports = {addComment,getComments,updateComment,deleteComment};
