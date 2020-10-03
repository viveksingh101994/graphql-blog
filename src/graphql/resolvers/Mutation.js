const { isValidEmail } = require('../../core/utils');
const { getSingleUser, addNewUser } = require('../../db/queries/user');
const { addNewPost, getPostById } = require('../../db/queries/post');
const { addComments: DBaddComments } = require('../../db/queries/comment');

const addPost = async (parents, args) => {
  const { title, body, published, authorEmail } = args;
  if (!isValidEmail(authorEmail)) {
    throw new Error('Please enter valid email');
  }
  const user = await getSingleUser({ email: authorEmail });
  const newPosts = await addNewPost({
    title,
    body,
    published,
    author: user.get('id'),
  });
  user.posts.push(newPosts.id);
  await user.save();
  return {
    ...newPosts.toJSON(),
    author: { ...user.toJSON() },
  };
};

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

const addUser = async (parents, args) => {
  const { name, email } = args;
  if (!isValidEmail(email)) {
    throw new Error('Please enter valid Email');
  }
  const isUser = await getSingleUser({ email });
  if (isUser) {
    return new Error('Please enter valid Email');
  }
  return addNewUser({ name, email });
};

const Mutation = {
  addPost,
  addComments,
  addUser,
};

module.exports = { Mutation };
