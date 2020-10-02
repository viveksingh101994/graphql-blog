const {
  addComments: DBaddComments,
  getSinglePostByCommentId,
} = require("../../mongo/comment");
const { getPostById } = require("../../mongo/post");
const { getUser, getSingleUser } = require("../../mongo/user");

const addComments = async (parent, args, context, info) => {
  const postInDB = await getPostById(args.postId);
  const user = await getSingleUser({ email: args.authorEmail });
  const newComment = await DBaddComments({
    text: args.text,
    post: post.id,
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

const author = (parents, args, context, info) => {
  return getSingleUser({ _id: parents.author });
};

const post = async (parents, args, context, info) => {
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
