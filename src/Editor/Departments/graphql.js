import gql from "graphql-tag"

export const LOADER = gql`
  query {
    allHouses: getAllHouses {
      id
      title
    }
    allStations: getAllStations {
      id
      title
    }
    adminDepartments: getAllDepartments {
      id
      title
      lshId
      mapsToHouse {
        id
        title
      }
      mapsToStation {
        id
        title
      }
    }
  }
`

export const UPDATE = gql`
  mutation($departmentId: ID!, $title: String!, $lshId: Int!, $mapsToHouse: ID, $mapsToStation: ID) {
    updateDepartment(
      departmentId: $departmentId
      title: $title
      lshId: $lshId
      mapsToHouse: $mapsToHouse
      mapsToStation: $mapsToStation
    ) {
      id
      title
      lshId
      mapsToHouse {
        id
        title
      }
      mapsToStation {
        id
        title
      }
    }
  }
`
