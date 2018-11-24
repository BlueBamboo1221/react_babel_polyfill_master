import gql from "graphql-tag"

export const LOADER = gql`
  query($entryId: ID!) {
    editEntry: getEntryForEditor(entryId: $entryId) {
      id
      stationOwner {
        id
      }
      inactivatesAt
      expiresAt
      starredIndex
      title
      description
      indexWords
      smartLinks {
        id
        type
        label
        link
      }
      mobile
      lshFixed
      lshPager
      createdAt
      lastUpdatedAt
      lastUpdatedBy {
        name
      }
      inCategories {
        id
        stations {
          id
          title
        }
      }
      altData {
        id
        title
      }
    }
    allStations: getAllStations {
      id
      title
    }
  }
`

export const UPDATE = gql`
  mutation(
    $entryId: ID!
    $starredIndex: Int
    $inactivatesAt: DateTime
    $expiresAt: DateTime
    $title: String!
    $indexWords: [String!]!
    $description: String
    $smartLinks: [SmartLinkInput!]!
    $mobile: Int
    $lshFixed: Int
    $lshPager: Int
    $stationOwnerId: ID!
    $altTitle: String
    $stationCategoryId: ID
  ) {
    updateEntry(
      entryId: $entryId
      starredIndex: $starredIndex
      inactivatesAt: $inactivatesAt
      expiresAt: $expiresAt
      title: $title
      indexWords: $indexWords
      description: $description
      smartLinks: $smartLinks
      mobile: $mobile
      lshFixed: $lshFixed
      lshPager: $lshPager
      stationOwnerId: $stationOwnerId
      altTitle: $altTitle
      stationCategoryId: $stationCategoryId
    ) {
      id
      # must load all fields back b/c selecting same Entry will not cause re-mount and re-load of data!
      stationOwner {
        id
      }
      inactivatesAt
      expiresAt
      starredIndex
      title
      description
      indexWords
      smartLinks {
        id
        type
        label
        link
      }
      mobile
      lshFixed
      lshPager
      createdAt
      lastUpdatedAt
      lastUpdatedBy {
        name
      }
      inCategories {
        id
        stations {
          id
          title
        }
      }
      altData {
        id
        title
      }
    }
  }
`
