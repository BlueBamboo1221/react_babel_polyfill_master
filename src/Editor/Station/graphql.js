import gql from "graphql-tag"

export const LOADER = gql`
  query($stationId: ID!) {
    editStation: getStationForEditor(stationId: $stationId) {
      id
      title
      description
      url
      entryDescriptions
      type
      editors {
        id
      }
    }
    allUsers: getAllUsers {
      id
      name
    }
  }
`

export const UPDATESTATION = gql`
  mutation(
    $stationId: ID!
    $title: String!
    $description: String
    $url: String
    $type: String!
    $entryDescriptions: String!
    $editors: [ID!]!
  ) {
    editStation: updateStation(
      stationId: $stationId
      title: $title
      description: $description
      url: $url
      type: $type
      entryDescriptions: $entryDescriptions
      editors: $editors
    ) {
      id
      lastUpdatedAt
      title
      description
      url
      type
      entryDescriptions
      editors {
        id
      }
    }
  }
`

export const CATEGORIZEENTRYINSTATION = gql`
  mutation($actionType: String!, $stationId: ID!, $categoryId: ID!, $currentCategoryId: ID, $entryId: ID!) {
    categorizeEntryInStation(
      actionType: $actionType
      stationId: $stationId
      categoryId: $categoryId
      currentCategoryId: $currentCategoryId
      entryId: $entryId
    ) {
      id
      categories {
        id
        entries {
          id
          # NOTE learning point: why is stationOwner needed after re-categorization?
          stationOwner {
            id
          }
        }
      }
      ownedEntries(where: { inCategories_none: { stations_some: { id: $stationId } } }) {
        id
      }
    }
  }
`

// remember, resolver uses updateStation thus returns Station type
export const CREATEENTRYINSTATION = gql`
  mutation($stationId: ID!) {
    createEntryForStation(stationId: $stationId) {
      id
      ownedEntries(where: { inCategories_none: { stations_some: { id: $stationId } } }) {
        id
        title
        description
        stationOwner {
          id
        }
      }
    }
  }
`

export const DELETEENTRYINSTATION = gql`
  mutation($entryId: ID!, $stationId: ID!) {
    deleteEntryInStation(entryId: $entryId, stationId: $stationId) {
      id
      categories {
        id
        entries {
          id
        }
      }
      ownedEntries(where: { inCategories_none: { stations_some: { id: $stationId } } }) {
        id
      }
    }
  }
`
