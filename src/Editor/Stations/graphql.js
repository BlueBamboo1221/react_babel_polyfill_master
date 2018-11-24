import gql from "graphql-tag"

export const LOADER = gql`
  query {
    adminStations: getAllStations {
      id
      lastUpdatedAt
      lastUpdatedBy {
        name
      }
      title
      type
      editors {
        id
        name
      }
    }
  }
`

export const UPDATE = gql`
  mutation($stationId: ID!, $key: String!, $value: String) {
    updateStation(stationId: $stationId, key: $key, value: $value) @client {
      id
      lastUpdatedAt
      lastUpdatedBy {
        id
        name
      }
      title
      type
      editors {
        id
      }
    }
  }
`

export const CREATE = gql`
  mutation {
    createStation
  }
`
