import { gql } from 'apollo-angular';

/**
 * GraphQL query for fetching users.
 */
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

/**
 * GraphQL mutation for creating user.
 */
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
