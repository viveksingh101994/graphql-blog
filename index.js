const application = require('express')();
const { json } = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { initConnection } = require('./src/db');
const { schema } = require('./src/business-logic');

// Middleware
application.use(json());
application.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

application.get('/', (req, res) => {
  res.send('Express app');
});

// application.use((resData, req, res, next) => {
//   res.locals = resData;
//   next();
// });

// application.use((req, res, next) => {
//   res.json(res.locals.message);
// });

application.listen(process.env.PORT, () => {
  initConnection();
  console.log(`listening on port ${process.env.PORT}`);
});
