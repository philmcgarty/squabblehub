import { gql } from '@apollo/client';

export const VOTE = gql`
    mutation vote($pollId: String!, $optionIndex: Int!) {
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

export const USER_LOGIN = gql`
    mutation userLogin($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const USER_SIGNUP = gql`
    mutation userSignup($username: String!, $email: String!, $password: String!) {
        userSignup(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }

`;

export const ADD_COMMENT = gql`
    mutation commentAdd($commentText: String!, $movieorbook: Int!, $squabbleId: ID!) {
        commentAdd(commentText: $commentText, movieorbook: $movieorbook, squabbleId: $squabbleId) {
            _id
            commentText
            createdAt
            username
            movieorbook
        }
    }
`;

export const ADD_SUGGESTION = gql`
    mutation suggestionAdd($suggestionTitle: String!) {
        suggestionAdd(suggestionTitle: $suggestionTitle) {
            _id
            suggestionTitle
            createdAt
            username
        }
    }
`;