const express = require("express");
const graphqlHTTP = require("express-graphql");
const bookSchema = require('./schema/bookSchema');
const app = express();

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
