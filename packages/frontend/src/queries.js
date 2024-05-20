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

export const GET_ALL_BLOG_POSTS = gql`
  query GetAllBlogPosts {
    getAllBlogPosts {
      id
      slug
      title
      date
      body
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
