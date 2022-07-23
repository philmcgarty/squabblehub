import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
mutation userLogin ($password: String!, $email: String!){
    userLogin(email: $email, password: $password) {
        token
        user{
            _id
            username
            email
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

export const SUGGESTION_ADD = gql`
mutation suggestionAdd ($suggestionTitle: String!) {
    suggestionAdd(suggestionTitle: $suggestionTitle) {
      suggestionTitle
      _id
      username
    }
    }
`;

export const VOTE = gql`
    mutation vote($pollId: ID!, $optionIndex: Int!) {
        vote(pollId: $pollId, optionIndex: $optionIndex) {
            _id
            question
            options {
                optionName
                votes
            }
        }
    }
`;