const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    getAllUsers: [User]!
    getVisitCount: Int!
    getAllBlogPosts: [BlogPost!]!
    getBlogPost(slug: String!): BlogPost
    getAllProjects: [Project!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: Int!, name: String, email: String): User
    deleteUser(id: Int!): User
    incrementVisitCount: Int!
    addBlogPost(slug: String!, title: String!, date: String!, body: String!): BlogPost!
    submitContactForm(name: String!, email: String!, message: String!): ContactFormResponse!
  }

  type User {
    id: Int!
    name: String!
    email: String!
  }

  type BlogPost {
    id: Int!
    slug: String!
    title: String!
    date: String!
    body: String!
  }

  type Project {
    id: Int!
    title: String!
    description: String!
    imageUrl: String!
    projectUrl: String!
  }

  type ContactFormResponse {
    success: Boolean!
    message: String!
  }
`;

module.exports = { typeDefs };
