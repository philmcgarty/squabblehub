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
  comments: [Comment]
}
`;





// export 
module.exports = typeDefs