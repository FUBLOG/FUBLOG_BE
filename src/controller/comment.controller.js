const commentService = require("../services/comment.service")

// create cmt
const createCmt = async (req, res) => {
  const { postID, userID, parentCommentID, content } = req.body

  try {
    const newCmt = await commentService.createCmt(
      postID,
      userID,
      parentCommentID,
      content
    );
    res.status(201).json({
      message: '',
      comment: newCmt,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// get cmt
const getCmt = async (req, res) => {
  const { commentID } = req.params;

  try {
    const comment = await commentService.getCmt(commentID);
    res.status(200).json({
      comment,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// update cmt
const updateCmt = async (req, res) => {
   const { commentID } = req.params;
   const { content } = req.body;
 
   try {
     const updatedCmt = await commentService.updateCmt(commentID, content);
     res.status(200).json({
       message: 'da cap nhat',
       comment: updatedCmt,
     });
   } catch (error) {
     res.status(400).json({
       message: error.message,
     });
   }
 };
 
 // xoa cmt
 const deleteCmt = async (req, res) => {
   const { commentID } = req.params;
 
   try {
     await commentService.deleteCmt(commentID);
     res.status(200).json({
       message: 'da xoa cmt',
     });
   } catch (error) {
     res.status(500).json({
       message: error.message,
     });
   }
 };
 
 module.exports = {createCmt,getCmt,updateCmt,deleteCmt};
 
