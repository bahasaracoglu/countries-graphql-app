import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query GetCountries {
    countries {
      name
      code
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
      continent {
        name
      }
    }
  }
`;
