import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
mutation userLogin ($password: String!, $email: String!){
    userLogin(email: $email, password: $password) {
        token
        user{
            _id
            username
        }
    }
}
  `;

export const USER_SIGNUP = gql`
mutation userSignup ($username: String!, $password: String!, $email: String!){
    userSignup(username: $username, email: $email, password: $password) {
      token 
      user {
        username
        _id
      }
    }
  }
`;

//(NO VARIABLE NEEDED) adds a comment to the only squabble in db - in pro of movies
export const COMMENT_ADD_CURRENT_MOVIE = gql`
mutation commentAddCurrentMovie($commentText: String!) {
  commentAddCurrentMovie(commentText: $commentText) {
    _id
    commentText
    movieorbook
    forSquabble
    createdAt
  }
}
`;

//(NO VARIABLE NEEDED) adds a comment to the only squabble in db - in pro of books
export const COMMENT_ADD_CURRENT_BOOK = gql`
mutation commentAddCurrentBook ($commentText: String!) {
  commentAddCurrentBook(commentText: $commentText) {
    _id
    commentText
    movieorbook
    forSquabble
    createdAt
  }
}
`;


export const COMMENT_ADD = gql`
mutation commentAdd($commentText: String!, $movieorbook: Int!, $squabbleId: ID!){
    commentAdd(commentText: $commentText, movieorbook: $movieorbook, squabbleId: $squabbleId) {
      _id
      commentText
      username
      forSquabble
    }
  }
`;

export const COMMENT_DELETE = gql`
mutation commentDelete($commentId: ID!) {
    commentDelete(commentId: $commentId)
  }
`;

export const COMMENT_EDIT = gql`
mutation commentEdit($commentId: ID!, $commentNewText: String!){
    commentEdit(commentId: $commentId, commentNewText: $commentNewText) {
      _id
      commentText
      movieorbook
      createdAt
    }
  }
`;

export const SUGGESTION_ADD = gql`
mutation suggestionAdd ($suggestionTitle: String!) {
    suggestionAdd(suggestionTitle: $suggestionTitle) {
      suggestionTitle
      _id
      username
    }
    }
`;

export const ADD_BOOKVOTE = gql`
  mutation bookVoteAdd($squabbleId: ID!) {
    bookVoteAdd(squabbleId: $squabbleId) {
      _id
      title
      bookVotes
    }
  }
`;

export const ADD_MOVIEVOTE = gql`
  mutation MovieVoteAdd($squabbleId: ID!) {
    movieVoteAdd(squabbleId: $squabbleId) {
      _id
      title
      movieVotes
    }
  }
`;

export const VOTE = gql`
mutation vote($pollId: ID!, $indexId: Int!){
    vote(pollId: $pollId, indexId: $indexId) {
      _id
      oneTitle
      oneVoteCount
      oneVoters {
      _id
      username
      }
      twoTitle
      twoVoteCount
      twoVoters {
        _id
        username
      }
      threeTitle
      threeVoteCount
      threeVoters {
        _id
        username
      }
    }
  }
  
`;