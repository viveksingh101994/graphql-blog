const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  published: {
    required: true,
    type: Boolean,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

const post = model("post", postSchema);

const addNewPost = async ({ title, body, published, author }) => {
  try {
    const newPost = new post({ title, body, published, author });
    const isSaved = await newPost.save();
    if (!isSaved) {
      throw new Error("Internal Server Error");
    }
    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
};

const getPostsByEmail = async ({ email }) => {
  return post.find({});
};

const getPosts = async (query) => {
  return post.find(query).populate("author").populate("comments");
};

const getSinglePost = async (query) => {
  return post.findOne(query).populate("author").populate("comments");
};
const getPostById = async (id) => {
  return post.findById(id).populate("author").populate("comments");
};

module.exports = {
  addNewPost,
  getPostsByEmail,
  getPosts,
  getSinglePost,
  getPostById,
};
