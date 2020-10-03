const { getSingleUser } = require('../../db/queries/user');
const { getSinglePostByCommentId } = require('../../db/queries/comment');

const Comment = {
  author: (parents) => {
    return getSingleUser({ _id: parents.author });
  },
  post: async (parents) => {
    const comments = await getSinglePostByCommentId(parents.id);
    return comments.post;
  },
};

module.exports = { Comment };
