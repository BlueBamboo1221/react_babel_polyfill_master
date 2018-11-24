import gql from "graphql-tag"

export const LOADER = gql`
  query($stationId: ID!) {
    editStation: getStationForEditor(stationId: $stationId) {
      id
      categories {
        id
        index
        bcolor
        fcolor
        title
        entries {
          id
          description
          title
          stationOwner {
            id
          }
        }
      }
    }
  }
`

export const UPDATECATEGORY = gql`
  mutation($categoryId: ID!, $index: Int!, $title: String!, $bcolor: String, $fcolor: String) {
    updateCategory(categoryId: $categoryId, index: $index, title: $title, bcolor: $bcolor, fcolor: $fcolor) {
      id
      index
      title
      bcolor
      fcolor
    }
  }
`

export const CREATECATEGORYINSTATION = gql`
  mutation($stationId: ID!) {
    createCategoryInStation(stationId: $stationId) {
      id
      categories {
        id
        index
        title
        bcolor
        fcolor
        # needs ids not rest
        entries {
          id
        }
      }
    }
  }
`

export const DELETECATEGORYINSTATION = gql`
  mutation($stationId: ID!, $categoryId: ID!) {
    deleteCategoryInStation(stationId: $stationId, categoryId: $categoryId) {
      id
      categories {
        id
        index
        title
        bcolor
        fcolor
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
