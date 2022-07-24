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
  forSquabble: String
}

type User {
  _id: ID
  username: String
  email: String
  password: String
  comments: [Comment]
  favSquabbles: [Squabble]
}

type Squabble {
  _id: ID
  title: String
  createdAt: String
  bookAuthor: String
  bookYear: Int
  movieDirector: String
  movieYear: Int
  winningParty: Int
  squabbleComments: [Comment]
  bookVotes: Int
  movieVotes: Int
}

type Polls {
  _id: ID
  question: String
  oneVoters: [User]
  twoVoters: [User]
  threeVoters: [User]
  oneTitle: String
  twoTitle: String
  threeTitle: String
  oneVoteCount: Int
  twoVoteCount: Int
  threeVoteCount: Int
}


type Auth {
  token: ID!
  user: User
}

type Suggestion {
  _id: ID
  suggestionTitle: String
  createdAt: String
  username: String
}

type Query {
  commentsAllOrByUser(username: String): [Comment]
  commentsByPreference(movieorbook: Int): [Comment]
  commentById(commentId: ID!): Comment
  commentsByMovie(squabbleId: String!, movieorbookId: Int): [Comment]
  commentsByBook(squabbleId: String!, movieorbookId: Int): [Comment]

  usersAll: [User]
  userByName(username: String!): User
  userMe: User

  squabbleAll: [Squabble]
  squabbleById(_id: ID!): Squabble

  suggestionAllorByUser(username: String): [Suggestion]
  
  polls: [Polls]
}

type Mutation {
  userLogin(email: String!, password: String!): Auth
  userSignup(username: String!, email: String!, password: String!): Auth

  commentAdd(commentText: String!, movieorbook: Int!, squabbleId: ID! ): Comment
  commentDelete(commentId: ID!): String
  commentEdit(commentId: ID!, commentNewText: String!): Comment

  suggestionAdd(suggestionTitle: String!): Suggestion

  squabbleAddFavourite(squabbleId: ID!): Squabble

  movieVoteAdd(squabbleId: ID!): Squabble
  bookVoteAdd(squabbleId: ID!): Squabble
  
  vote(pollId: ID!, indexId: Int!): String
}
`;

//squabblefavourite is under consideration

// export 
module.exports = typeDefs




//CODE FROM A PREVIOUS ITERATION OF POLLS
// type Polls {
//   _id: ID
//   question: String
//   options: [Options]
// }
// type Options{
//   optionName: String
//   votes: Int
// }







