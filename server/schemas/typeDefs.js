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

type Auth {
  token: ID!
  user: User
}

type Query {
  commentsByUser(username: String): [Comment]
  commentsByPreference(movieorbook: Int): [Comment]
  commentById(_id: ID!): Comment

  usersAll: [User]
  userByName(username: String!): User
  userMe: User
}

type Mutation {
  userLogin(email: String!, password: String!): Auth
  userSignup(username: String!, email: String!, password: String!): Auth
}



`;





// export 
module.exports = typeDefs