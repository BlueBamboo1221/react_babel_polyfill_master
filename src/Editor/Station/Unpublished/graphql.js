import gql from "graphql-tag"

export const OWNSTATION = gql`
  query($stationId: ID!) {
    unpublishedEntries: getStationForEditor(stationId: $stationId) {
      id
      ownedEntries(where: { inCategories_none: { stations_some: { id: $stationId } } }) {
        id
        title
        description
      }
    }
  }
`

export const OTHERSTATION = gql`
  query($stationId: ID!) {
    categorizedEntries: getStationForEditor(stationId: $stationId) {
      id
      categories {
        id
        index
        title
        entries {
          id
          title
          description
        }
      }
    }
  }
`

export const ALLSTATIONS = gql`
  query($stationId: [ID!]) {
    allStations: getAllStations(exceptStationIds: $stationId) {
      id
      title
    }
  }
`
