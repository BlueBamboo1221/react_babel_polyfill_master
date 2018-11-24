import gql from "graphql-tag"

export const LOADER = gql`
  query {
    adminUsers: getAllUsers {
      id
      latestLoginAt
      ssn
      name
      adminLevel
      editorForStations {
        id
        type
        title
      }
    }
    allStations: getAllStations {
      id
      title
    }
  }
`

export const CREATE = gql`
  mutation {
    createUser
  }
`

export const DELETE = gql`
  mutation($userId: ID) {
    deleteUser(userId: $userId)
  }
`

export const UPDATE = gql`
  mutation($userId: ID!, $ssn: String!, $name: String!, $adminLevel: String!, $editorForStations: [ID!]!) {
    updateUser(
      userId: $userId
      ssn: $ssn
      name: $name
      adminLevel: $adminLevel
      editorForStations: $editorForStations
    ) {
      id
      ssn
      name
      adminLevel
      editorForStations {
        id
        type
      }
    }
  }
`
