const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { users, user, addUser } = require("./user");
const { posts, post, addPost } = require("./post");
const { addComments } = require("./comment");

const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    users,
    posts,
    post,
    me: user,
  },
});

const rootMutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser,
    addPost,
    addComments,
  },
});

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

module.exports = {
  schema,
};
