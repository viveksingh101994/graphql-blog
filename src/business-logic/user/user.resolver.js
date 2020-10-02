const { getUser, getSingleUser, addNewUser } = require('./user');
const { isValidEmail } = require('../../core/utils');

const users = () => {
  return getUser({});
};

const me = (parents, args) => {
  const { email } = args;
  if (!isValidEmail(email)) {
    throw new Error('Please enter valid email');
  }
  return getSingleUser({ email });
};

const addUser = async (parents, args) => {
  const { name, email } = args;
  if (!isValidEmail(email)) {
    throw new Error('Please enter valid Email');
  }
  const isUser = await getSingleUser({ email });
  if (isUser) {
    return new Error('Please enter valid Email');
  }
  return addNewUser({ name, email });
};

const post = async (parents) => {
  return parents.posts;
};

module.exports = {
  Query: {
    users,
    me,
  },
  Mutation: {
    addUser,
  },
  User: {
    post,
  },
};
