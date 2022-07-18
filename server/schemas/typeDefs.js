// import 
const { gql } = require('apollo-server-express');

// create 
const typeDefs = gql`
type Comment {
  _id: ID
  commentText: String
  createdAt: String
  username: String
  movieorbook: Int
}

type Query {
  comments(username: String): [Comment]
}

type Query {
  comments(movieorbook: Int): [Comment]
}
`;





// export 
module.exports = typeDefs