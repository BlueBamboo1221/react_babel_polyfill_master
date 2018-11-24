import gql from "graphql-tag"

export default gql`
  {
    getStationsData {
      id
      type
      title
      description
      url
      entryDescriptions
      editors {
        ssn
        name
      }
      categories(orderBy: index_ASC) {
        id
        index
        bcolor
        fcolor
        title
        entries {
          id
          altData {
            title
          }
        }
      }
    }
    getEntriesData {
      id
      lastUpdatedAt
      inactivatesAt
      house {
        shortcut
      }
      title
      indexWords
      description
      smartLinks {
        type
        label
        link
      }
      lshFixed
      lshPager
      mobile
      starredIndex
    }
    getDepartmentsData {
      id
      lshId
      mapsToStation {
        id
      }
    }
  }
`

// export default JSON
