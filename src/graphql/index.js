const { Query } = require('./resolvers/Query');
const { Mutation } = require('./resolvers/Mutation');
const { Subscription } = require('./resolvers/Subscription');
const { User } = require('./resolvers/User');
const { Post } = require('./resolvers/Post');
const { Comment } = require('./resolvers/Comment');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
};

module.exports = { resolvers };
