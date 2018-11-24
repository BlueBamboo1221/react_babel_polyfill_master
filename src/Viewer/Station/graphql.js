import gql from "graphql-tag"

export const LOADER = gql`
  query($stationId: ID!) {
    viewStation: getStationForViewer(stationId: $stationId) {
      id
      lastUpdatedAt
      entryDescriptions
      editors {
        ssn
        name
      }
      description
      url
      categories(orderBy: index_ASC) {
        id
        index
        title
        entries(orderBy: title_ASC) {
          id
          title
          altData {
            title
          }
          description
          mobile
          lshPager
          lshFixed
          other
          url
        }
      }
    }
  }
`
