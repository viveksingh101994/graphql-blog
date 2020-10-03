const { Config } = require('../../config');
const { isValidEmail } = require('../../core/utils');
const { getSingleUser, addNewUser } = require('../../db/queries/user');
const { addNewPost, getPostById } = require('../../db/queries/post');
const { addComments: DBaddComments } = require('../../db/queries/comment');
const { PrismaQueries } = require('../../prisma');

const addPost = async (parents, { title, body, published, authorEmail }, { pubsub }) => {
  if (!isValidEmail(authorEmail)) {
    throw new Error('Please enter valid email');
  }
  if (Config.USE_PRISMA_TOGGLE) {
    return PrismaQueries.addPost({ title, body, published, authorEmail }).catch((err) => {
      console.log(err);
    });
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
  if (published) {
    pubsub.publish('post', {
      post: {
        mutation: 'CREATED',
        data: { ...newPosts.toJSON() },
      },
    });
  }
  return {
    ...newPosts.toJSON(),
    author: { ...user.toJSON() },
  };
};

const addComments = async (parent, { postId, authorEmail, text }, { pubsub }) => {
  const postInDB = await getPostById(postId);
  const user = await getSingleUser({ email: authorEmail });
  if (!postInDB || !user) {
    return new Error('Unable to find user and post');
  }

  const newComment = await DBaddComments({
    text,
    post: postInDB.id,
    author: user.id,
  });
  user.comments.push(newComment.id);
  postInDB.comments.push(newComment.id);
  await postInDB.save();
  await user.save();
  pubsub.publish(`comment_${postId}`, {
    comment: { ...newComment.toJSON() },
  });
  return {
    ...newComment.toJSON(),
    post: postInDB.toJSON(),
    author: user.toJSON(),
  };
};

const addUser = async (parents, { name, email }) => {
  if (!isValidEmail(email)) {
    throw new Error('Please enter valid Email');
  }
  if (Config.USE_PRISMA_TOGGLE) {
    return PrismaQueries.addUser({ name, email }).catch((err) => {
      console.log(err);
      throw new Error('Please enter valid Email');
    });
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
