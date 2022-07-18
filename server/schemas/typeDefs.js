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

type User {
  _id: ID
  username: String
  email: String
  password: String
  comments: [Comment]
}

type Query {
  commentsByUser(username: String): [Comment]
  commentsByPreference(movieorbook: Int): [Comment]
  commentById(_id: ID!): Comment

  usersAll: [User]
  userByName(username: String!): User
}

`;





// export 
module.exports = typeDefs