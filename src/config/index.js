const Config = {
  PORT: process.env.PORT || 9090,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || 'mongodb://localhost/comment-graphql',
  USE_PRISMA_TOGGLE: process.env.USE_PRISMA_TOGGLE === 'true' || false,
};

module.exports = { Config };
