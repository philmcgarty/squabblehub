// import 
const { gql } = require('apollo-server-express');

// create 
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

// export 
module.exports = typeDefs