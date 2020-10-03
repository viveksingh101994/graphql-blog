const { GraphQLServer, PubSub } = require('graphql-yoga');
const { resolvers } = require('./src/graphql');
const { initConnection } = require('./src/db');

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './src/graphql/schema.graphql',
  resolvers,
  context: { pubsub },
});
server
  .start({
    port: 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/playground',
  })
  .then(() => {
    initConnection();
    console.log('Server is running on localhost:4000');
  });
