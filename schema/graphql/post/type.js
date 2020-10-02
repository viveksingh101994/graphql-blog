const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { getSingleUser } = require("../../mongo/user");

const postType = new GraphQLObjectType({
  name: "post",
  fields: () => {
    const { userType } = require("../user/type");
    const { commentType } = require("../comment/type");
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      title: {
        type: GraphQLString,
      },
      body: {
        type: GraphQLString,
      },
      published: {
        type: GraphQLBoolean,
      },
      author: {
        type: userType,
        resolve: (parents, args, context, info) => {
          return getSingleUser({ _id: parents.author });
        },
      },
      comments: {
        type: new GraphQLList(commentType),
      },
    };
  },
});

module.exports = {
  postType,
};
