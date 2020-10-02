const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require("graphql");
const { getPostById } = require("../../mongo/post");
const { getUser, getSingleUser } = require("../../mongo/user");
const { addComments: DBaddComments } = require("../../mongo/comment");
const { commentType } = require("./type");

const getComments = {
  type: new GraphQLList(commentType),
  resolve: () => {
    return getUser();
  },
};

const addComments = {
  type: commentType,
  description: "Add comments by author",
  args: {
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    authorEmail: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (parent, args, context, info) => {
    const post = await getPostById(args.postId);
    const user = await getSingleUser({ email: args.authorEmail });
    const newComment = await DBaddComments({
      text: args.text,
      post: post.id,
      author: user.id,
    });
    user.comments.push(newComment.id);
    post.comments.push(newComment.id);
    await post.save();
    await user.save();
    return {
      ...newComment.toJSON(),
      post: post.toJSON(),
      author: user.toJSON(),
    };
  },
};

module.exports = {
  addComments,
};
