const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    getAllUsers: [User]!
    getVisitCount: Int!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: Int!, name: String, email: String): User
    deleteUser(id: Int!): User
    incrementVisitCount: Int!
  }

  type User {
    id: Int!
    name: String!
    email: String!
  }
`;

module.exports = { typeDefs };
