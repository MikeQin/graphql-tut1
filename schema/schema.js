// {
//   book(id: "1") {
//     id
//     name
//     genre
//   }
// }
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = require('graphql');
const _ = require('lodash');

// dummy data
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: "1" },
  { name: 'The Final Empire', genre: 'Fantasy', id: "2" },
  { name: 'The Long Earth', genre: 'Sci-Fi', id: "3" }
];

const BookType = new GraphQLObjectType({
  name: 'BookType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        //console.log(typeof (args.id));
        return _.find(books, { id: args.id });
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});