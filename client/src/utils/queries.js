import { gql } from '@apollo/client';

//*******SQUABBLE QUERIES**********************************************************//
 // (NO VARIABLE NEEDED) returns the squabble that is currently hardcoded in the seeded file 
export const QUERY_SQUABBLE_NAME = gql`
query  squabbleName {
  squabbleName(title: "The Lord of The Rings: The Followship Of The Ring") {
  _id
  title
  winner
  createdAt
  bookAuthor
  bookYear
  movieDirector
  movieYear
  bookVoteCount
  bookVotes{
    _id
    username
  }
  movieVoteCount
  movieVotes{
    _id
    username
  }
  commentCount
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


// (NO VARIABLE NEEDED) returns ALL the squabbles in db
export const QUERY_SQUABBLE_ALL = gql`
query squabbleAll{
    squabbleAll {
      _id
      winner
      title
      createdAt
      bookAuthor
      bookYear
      movieDirector
      movieYear
      bookVoteCount
      bookVotes{
        _id
        username
      }
      movieVoteCount
      movieVotes{
        _id
        username
      }
      commentCount
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



//*******COMMENT QUERIES**********************************************************//

//(NO VARIABLE NEEDED) , returns the current commments in pro of movies
export const QUERY_CURRENT_MOVIE_COMMENTS = qql`
query commentsByCurrentMovie{
  commentsByCurrentMovie {
    _id
    username
    commentText
    movieorbook
    forSquabble
    createdAt
  }
}
`;

// (NO VARIABLE NEEDED) , returns the current comments in pro of books
export const QUERY_CURRENT_BOOK_COMMENTS = qql`
query commentsByCurrentBook{
  commentsByCurrentBook {
    _id
    username
    commentText
    movieorbook
    forSquabble
    createdAt
  }
}
`;




//*******USER QUERIES**********************************************************//

// (NO VARIABLE NEEDED..but needs the login token) returns the data of the user that is logged in only.
export const QUERY_USER_ME = gql`
query userMe {
  userMe {
    _id
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



//*******POLL and SUGGESTION QUERIES**********************************************************//

// (NO VARIABLE NEEDED)  retreives the inofrmation votes from NEXT WEEK SQUABBLE poll
export const QUERY_POLLS = gql`
query polls{
  polls {
    _id
    question
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

// (NO VARIABLE NEEDED) query that retuns all the SUGGESTIONS posted by users. You can provide an optional parameter of a username but is not needed
export const QUERY_SUGGESTIONS = gql`
query suggestionAllorByUser($username: String){
  suggestionAllorByUser(username:$username){
    _id
    suggestionTitle
    username
    createdAt
  }
}
`;



//******************************************************************************************************** */
//*************************** */ QUERIES FOR FUTURE FUNCTIONALITY WITH VARIABLES*************************///

// returns a single squabble providind an ID variable
export const QUERY_SQUABBLE_ID = gql`
query squabbleById($id: ID!){
    squabbleById(_id: $id) {
      _id
      title
      winner
      createdAt
      bookAuthor
      bookYear
      movieDirector
      movieYear
      bookVoteCount
      bookVotes{
        _id
        username
      }
      movieVoteCount
      movieVotes{
        _id
        username
      }
      commentCount
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

// ALL comments for a specific squabble (TAKES Squabble ID Varible and mobvioeorbook: variable), in pro of Movies 
export const QUERY_COMMENTS_SQUABBLE_MOVIES = gql`
query   commentsByMovie($squabbleId: String!){
    commentsByMovie(squabbleId: $squabbleId) {
      commentText
      movieorbook
    }
  }
`;

// ALL comments for a specific squabble (TAKES Squabble ID Varible and mobvioeorbook: variable), in pro of Books 
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

// returns all the comments made by a user, in pro of books and movies takes the parameter of a user name, if no parameter, will return all comments in db
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

// query that returns a single user info. Takes a username as parameter
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