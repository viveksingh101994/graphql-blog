const { join } = require('path');
const {
  makeExecutableSchema,
  mergeTypeDefs,
  loadFilesSync,
  mergeResolvers,
} = require('graphql-tools');

const typesArray = loadFilesSync(join(__dirname, '**/*.graphql'));
const typeDefs = mergeTypeDefs(typesArray, { all: true });
const resolversArray = loadFilesSync(join(__dirname, './**/*.resolver.js'));
const mergedResolvers = mergeResolvers(resolversArray);
const schema = makeExecutableSchema({ typeDefs, resolvers: mergedResolvers });

module.exports = {
  schema,
};
