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

// //example of code to use if a model squabble is implemented
// //seeders file will have to be modified as well
// // comment has to be modified to belong to a certain squabble by it's id
// type Squabble {
//   _id: ID
//   squabbleTitle: String
//   squabbleBook: String
//   squabbleMovie: String
//   squabbleDescription: String
//   squableStatus: String
//   squabbleCommentCount: Number
// }

// type Query {
//   squabbleAll: [Squabble]
//   squableById(_id: ID!): Squabble
// }



// export 
module.exports = typeDefs