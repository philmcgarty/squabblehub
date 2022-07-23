import { gql } from '@apollo/client';

export const QUERY_POLLS = gql`
    {
        polls {
            _id
            question
            options {
                optionName
                votes
            }
        }
 
    }
`;


export const QUERY_ME = gql`
    {
        userMe {
            _id
            username
            email
            password
            comments {
                _id
                commentText
                createdAt
                username
                movieorbook
            }
        }
    }
`

export const QUERY_USER = gql`
    query userByName($username: String!) {
        userByName(username: $username) {
            _id
            username
            email
            password
            comments {
                _id
                commentText
                createdAt
                username
                movieorbook
            }
        }
    }
`
