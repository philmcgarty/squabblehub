// import 
const { gql } = require('apollo-server-express');

// create 
const typeDefs = gql`
type Comment {
  _id: ID
  commentText: String
  createdAt: String
  username: String
  movieBetter: Boolean
}

type Query {
  comments(username: String): [Comment]
}

type Query {
  comments(movieBetter: Boolean): [Comment]
}
`;





// export 
module.exports = typeDefs