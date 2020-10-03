const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  text: {
    required: true,
    type: String,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const comment = model('comment', commentSchema);

const addComments = async ({ text, post, author }) => {
  try {
    const newComment = new comment({ text, post, author });
    const isSaved = await newComment.save();
    if (!isSaved) {
      throw new Error('Internal Server Error');
    }
    return newComment;
  } catch (err) {
    console.log(err);
    throw new Error('Internal Server Error');
  }
};

const getSinglePostByCommentId = async (id) => {
  return comment.findById(id).populate('post');
};

const getComments = (query) => {
  return comment.find(query);
};

module.exports = {
  addComments,
  getSinglePostByCommentId,
  getComments,
};
