const { connect, connection } = require("mongoose");
require("./comment");
require("./user");
require("./post");

const initConnection = () => {
  connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

connection
  .once("open", () => {
    console.log("Connection has been made,now make fireworks...");
  })
  .on("error", (err) => {
    console.log(`Error in db`, err);
  });

module.exports = {
  initConnection,
};
