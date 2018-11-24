import gql from "graphql-tag"

export const LOGIN = gql`
  mutation Login($ssn: String!) {
    loginResult: login(ssn: $ssn) {
      authToken
    }
  }
`
