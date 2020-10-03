const { getSingleUser } = require('../../db/queries/user');

const Post = {
  author: (parents) => {
    return getSingleUser({ _id: parents.author });
  },
};

module.exports = { Post };
