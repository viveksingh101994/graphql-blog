const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'post',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
});

const user = model('user', userSchema);

const getUser = (query) => {
  return user.find(query).populate('posts').populate('comments');
};

const getSingleUser = (query) => {
  return user.findOne(query).populate('posts').populate('comments');
};

const addNewUser = async ({ name, email }) => {
  try {
    const newUser = new user({ name, email });
    await newUser.save();
    return newUser;
  } catch (err) {
    console.log(err);
    throw new Error('Email already exists');
  }
};

module.exports = {
  getUser,
  getSingleUser,
  addNewUser,
};
