const express = require("express");
const graphqlHTTP = require("express-graphql");
const bookSchema = require('./schema/bookSchema');
const mongoose = require('mongoose');

const app = express();

// Connect to Mongo
mongoose.connect(
  "mongodb://localhost:27017/graphql-books",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    user: "mongo",
    pass: "mongo",
    authSource: "admin"
  },
  (error, db) => {
    if (error) console.log(error);
  }
);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB ...');
});
mongoose.Promise = global.Promise;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: bookSchema,
    graphiql: true,
    pretty: true
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listens on port ${port} ...`));
