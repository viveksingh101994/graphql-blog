const { getUser, getSingleUser, addNewUser } = require("./user");
const { isValidEmail } = require("../../core/utils");

const users = (parents, args, context, info) => {
  return getUser({});
};

const me = (parents, args, context, info) => {
  const { email } = args;
  if (!isValidEmail(email)) {
    throw new Error("Please enter valid email");
  }
  return getSingleUser({ email });
};

const addUser = async (parents, args, context, info) => {
  const { name, email } = args;
  if (!isValidEmail(email)) {
    throw new Error("Please enter valid Email");
  }
  const isUser = await getSingleUser({ email });
  if (isUser) {
    return new Error("Please enter valid Email");
  }
  return addNewUser({ name, email });
};

const post = async (parents, args, context, info) => {
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
