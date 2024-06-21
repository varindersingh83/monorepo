import { gql } from '@apollo/client';

export const GET_VISIT_COUNT = gql`
  query GetVisitCount {
    getVisitCount
  }
`;

export const INCREMENT_VISIT_COUNT = gql`
  mutation IncrementVisitCount {
    incrementVisitCount
  }
`;

export const ADD_BLOG_POST = gql`
  mutation AddBlogPost($slug: String!, $title: String!, $date: String!, $body: String!) {
    addBlogPost(slug: $slug, title: $title, date: $date, body: $body) {
      id
      slug
      title
      date
      body
    }
  }
`;

export const UPDATE_BLOG_POST = gql`
  mutation UpdateBlogPost($id: Int!, $slug: String!, $title: String!, $date: String!, $body: String!) {
    updateBlogPost(id: $id, slug: $slug, title: $title, date: $date, body: $body) {
      id
      slug
      title
      date
      body
    }
  }
`;

export const DELETE_BLOG_POST = gql`
  mutation DeleteBlogPost($id: Int!) {
    deleteBlogPost(id: $id) {
      id
    }
  }
`;

export const GET_ALL_BLOG_POSTS = gql`
  query GetAllBlogPosts {
    getAllBlogPosts {
      id
      slug
      date
      title
    }
  }
`;

export const GET_BLOG_POST = gql`
  query GetBlogPost($slug: String!) {
    getBlogPost(slug: $slug) {
      id
      title
      date
      body
    }
  }
`;

export const GET_ALL_PROJECTS = gql`
  query GetAllProjects {
    getAllProjects {
      id
      title
      description
      imageUrl
      projectUrl
    }
  }
`;

// New mutation for deleting all sessions
export const DELETE_ALL_SESSIONS = gql`
  mutation DeleteAllSessions {
    deleteAllSessions
  }
`;
