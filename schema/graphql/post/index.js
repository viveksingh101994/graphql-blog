const {
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");
const { getSingleUser } = require("../../mongo/user");
const { addNewPost, getPosts, getPostById } = require("../../mongo/post");
const { postType } = require("./type");
const { isValidEmail } = require("../../../core/utils");

const posts = {
  type: new GraphQLList(postType),
  description: "Lists of all posts",
  resolve: () => {
    return getPosts({});
  },
};

const post = {
  type: postType,
  description: "Post written by author",
  args: {
    id: {
      type: GraphQLID,
    },
  },
  resolve: (parents, args, context, info) => {
    return getPostById(args.id);
  },
};

const addPost = {
  type: postType,
  description: "Add post by author",
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
    published: {
      type: GraphQLBoolean,
    },
    authorEmail: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (root, args, context, info) => {
    const { title, body, published, authorEmail } = args;
    if (!isValidEmail(authorEmail)) {
      throw new Error("Please enter valid email");
    }
    const user = await getSingleUser({ email: authorEmail });
    const newPosts = await addNewPost({
      title,
      body,
      published,
      author: user.get("id"),
    });
    user.posts.push(newPosts._id);
    await user.save();
    return {
      ...newPosts.toJSON(),
      author: { ...user.toJSON() },
    };
  },
};

module.exports = {
  posts,
  post,
  addPost,
};
