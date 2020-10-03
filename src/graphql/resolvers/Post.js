const { getSingleUser } = require('../../db/queries/user');
const { Config } = require('../../config');
const { PrismaQueries } = require('../../prisma');

const Post = {
  author: ({ author }) => {
    if (Config.USE_PRISMA_TOGGLE) {
      return PrismaQueries.getSingleUser(author);
    }
    return getSingleUser({ _id: author });
  },
};

module.exports = { Post };
