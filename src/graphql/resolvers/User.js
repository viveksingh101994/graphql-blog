const User = {
  post: async (parents) => {
    return parents.posts;
  },
};

module.exports = { User };
