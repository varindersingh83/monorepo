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
