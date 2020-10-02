const { addComments: DBaddComments, getSinglePostByCommentId } = require('./comment');
const { getPostById } = require('../post/post');
const { getSingleUser } = require('../user/user');

const addComments = async (parent, args) => {
  const postInDB = await getPostById(args.postId);
  const user = await getSingleUser({ email: args.authorEmail });
  const newComment = await DBaddComments({
    text: args.text,
    post: postInDB.id,
    author: user.id,
  });
  user.comments.push(newComment.id);
  postInDB.comments.push(newComment.id);
  await postInDB.save();
  await user.save();
  return {
    ...newComment.toJSON(),
    post: postInDB.toJSON(),
    author: user.toJSON(),
  };
};

const author = (parents) => {
  return getSingleUser({ _id: parents.author });
};

const post = async (parents) => {
  const comments = await getSinglePostByCommentId(parents.id);
  return comments.post;
};

module.exports = {
  Mutation: {
    addComments,
  },
  Comment: {
    author,
    post,
  },
};
