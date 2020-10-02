const { addNewPost, getPosts, getPostById } = require("./post");

const post = (parents, args, context, info) => {
  return getPostById(args.id);
};

const posts = (parents, args, context, info) => {
  return getPosts({});
};

const addPost = async (parents, args, context, info) => {
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
};

const author = (parents, args, context, info) => {
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
