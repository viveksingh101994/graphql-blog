const { addNewPost, getPosts, getPostById } = require('./post');
const { isValidEmail } = require('../../core/utils');
const { getSingleUser } = require('../user/user');

const post = (parents, args) => {
  return getPostById(args.id);
};

const posts = () => {
  return getPosts({});
};

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

const author = (parents) => {
  return getSingleUser({ _id: parents.author });
};

module.exports = {
  Query: {
    post,
    posts,
  },
  Mutation: {
    addPost,
  },
  Post: {
    author,
  },
};
