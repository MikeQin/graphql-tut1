const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require('graphql');
const bookSchema = require('./schema/schema');

const userSchema = buildSchema(`
type User {
  id: String
  name: String
}

type Query {
  user(id: String): User
}
`);

// Maps id to User object
var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
  },
  'b': {
    id: 'b',
    name: 'bob',
  }
};

var root = {
  user: function ({ id }) {
    return fakeDatabase[id];
  }
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: bookSchema,
    //rootValue: root,
    graphiql: true,
    pretty: true
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listens on port ${port} ...`));
