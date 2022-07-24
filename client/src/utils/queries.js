import { gql } from '@apollo/client';

// returns a single squabble by it's ID
export const QUERY_SQUABBLE_ID = gql`
query squabbleById($id: ID!){
    squabbleById(_id: $id) {
    _id
    title
    createdAt
    bookAuthor
    bookYear
    movieDirector
    movieYear
    bookVotes
    movieVotes
    squabbleComments{
      _id
      commentText
      createdAt
      username
      movieorbook
      forSquabble
      }
    }
  }
`;


// returns all the squabbles in db
export const QUERY_SQUABBLE_ALL = gql`
query squabbleAll{
    squabbleAll {
    _id
    title
    createdAt
    bookAuthor
    bookYear
    movieDirector
    movieYear
    bookVotes
    movieVotes
    squabbleComments{
      _id
      commentText
      createdAt
      username
      movieorbook
      forSquabble
      }
    }
  }
`;

// ALL comments for a specific squabble, in pro of Movies 
export const QUERY_COMMENTS_SQUABBLE_MOVIES = gql`
query   commentsByMovie($squabbleId: String!){
    commentsByMovie(squabbleId: $squabbleId) {
      commentText
      movieorbook
    }
  }
`;

// ALL comments for a specific squabble, in pro of Books 
export const QUERY_COMMENTS_SQUABBLE_BOOKS = gql`
query   commentsByBook($squabbleId: String!){
    commentsByBook(squabbleId: $squabbleId) {
      _id
      commentText
      username
      createdAt
      movieorbook
    }
  }
`;


// takes the parameter of a user name, if no parameter, will return all comments in db
export const QUERY_COMMENTS_USER = gql`
query commentsAllOrByUser ($username: String){
    commentsAllOrByUser (username: $username) {
      _id
     commentText
     username
     movieorbook
     forSquabble
     createdAt
    } 
   }
`;

// takes the parameter of a comment id
export const QUERY_COMMENT_ID = gql`
query commentById ($commentId: ID!) {
    commentById(commentId: $commentId) {
     _id
    commentText
    username
    movieorbook
    forSquabble
    createdAt
  }
}
`;

// retreive the votes from next week squabbles
export const QUERY_POLLS = gql`
query polls{
    polls {
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

// query that returns the data of the user that is logged in only
export const QUERY_USER_ME = gql`
query userMe {
    userMe {
      username
      email
      comments {
        commentText
        movieorbook
        createdAt
        forSquabble
      }
    }
  }
`;


// query that takes a username as parameter
export const QUERY_USER_NAME = gql`
query userByname($username: String!){
    userByName(username: $username) {
      username
      email
      comments {
        commentText
        movieorbook
        createdAt
        forSquabble
      }
    }
  }
`;


// query that retuns all the suggestions posted by users. You can provide an optional parameter of a username
export const QUERY_SUGGESTIONS = gql`
query suggestionAllorByUser($username: String){
    suggestionAllorByUser(username:$username){
      suggestionTitle
      username
      _id
    }
  }
`;