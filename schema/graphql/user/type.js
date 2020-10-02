const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { postType } = require("../post/type");
const { commentType } = require("../comment/type");
const userType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    posts: {
      type: new GraphQLList(postType),
    },
    comments: {
      type: new GraphQLList(commentType),
    },
  },
});

module.exports = {
  userType,
};
