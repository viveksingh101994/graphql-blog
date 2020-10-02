const application = require("express")();
const { initConnection } = require("./schema/mongo");
const { json } = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schema/graphql");

// Middleware
application.use(json());
application.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

application.get("/", (req, res, next) => {
  res.send("Express app");
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
