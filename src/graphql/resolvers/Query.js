const { getPosts, getPostById } = require('../../db/queries/post');
const { getSingleUser, getUser } = require('../../db/queries/user');
const { getComments } = require('../../db/queries/comment');
const { isValidEmail } = require('../../core/utils');

const Query = {
  post: (parents, args) => {
    return getPostById(args.id);
  },

  posts: () => {
    return getPosts({});
  },
  comments: () => {
    return getComments({});
  },
  users: async () => {
    return getUser({});
  },

  me: (parents, args) => {
    const { email } = args;
    if (!isValidEmail(email)) {
      throw new Error('Please enter valid email');
    }
    return getSingleUser({ email });
  },
};

module.exports = { Query };
