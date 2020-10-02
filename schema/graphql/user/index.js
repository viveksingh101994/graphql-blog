const { GraphQLList, GraphQLNonNull, GraphQLString } = require("graphql");
const { getUser, getSingleUser, addNewUser } = require("../../mongo/user");
const { userType } = require("./type");
const { isValidEmail } = require("../../../core/utils");

const users = {
  type: new GraphQLList(userType),
  description: "Get lists of users",
  resolve: () => {
    return getUser({});
  },
};

const user = {
  type: userType,
  description: "Get user detail by email",
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (root, args) => {
    const { email } = args;
    if (!isValidEmail(email)) {
      throw new Error("Please enter valid email");
    }
    return getSingleUser({ email });
  },
};

const addUser = {
  type: userType,
  description: "Add new user",
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (root, args, context, info) => {
    const { name, email } = args;
    if (!isValidEmail(email)) {
      throw new Error("Please enter valid Email");
    }
    const isUser = await getSingleUser({ email });
    if (isUser) {
      return new Error("Please enter valid Email");
    }
    return addNewUser({ name, email });
  },
};

module.exports = {
  users,
  user,
  addUser,
};
