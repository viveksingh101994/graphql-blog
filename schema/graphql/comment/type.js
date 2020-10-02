const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require("graphql");
const { getSinglePostByCommentId } = require("../../mongo/comment");
const { getSingleUser } = require("../../mongo/user");

const commentType = new GraphQLObjectType({
  name: "comment",
  fields: () => {
    const { userType } = require("../user/type");
    const { postType } = require("../post/type");
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      text: {
        type: GraphQLString,
      },
      post: {
        type: postType,
        resolve: async (parents, args, context, info) => {
          const comments = await getSinglePostByCommentId(parents.id);
          return comments.post;
        },
      },
      author: {
        type: userType,
        resolve: (parents, args, context, info) => {
          return getSingleUser({ _id: parents.author });
        },
      },
    };
  },
});

module.exports = {
  commentType,
};
