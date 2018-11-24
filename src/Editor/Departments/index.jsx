import React from "react"
import { graphql } from "react-apollo"
import { SmartLink } from "../../UiHelpers"
import Edit from "./Edit"
import { LOADER } from "./graphql"
import { Outer, Row } from "../../stylesGlobal"
import { LshId, Title, House, Station } from "./styles"

class Departments extends React.Component {
  state = { editDepartmentId: null }

  render() {
    const {
      data: { loading, adminDepartments, allHouses, allStations }
    } = this.props
    const { editDepartmentId } = this.state
    if (loading) return <Outer loading />

    return (
      <Outer>
        {adminDepartments.map(department => {
          const { id: departmentId, lshId, title, mapsToHouse, mapsToStation } = department

          return (
            <Row key={departmentId}>
              {departmentId !== editDepartmentId ? (
                <React.Fragment>
                  <LshId>{lshId}</LshId>

                  <Title>
                    <SmartLink fnHandle={() => this.setState({ editDepartmentId: departmentId })}>{title}</SmartLink>
                  </Title>

                  <House>{mapsToHouse && mapsToHouse.title}</House>

                  <Station>{mapsToStation.title}</Station>
                </React.Fragment>
              ) : (
                <Edit departmentData={department} allHouses={allHouses} allStations={allStations} />
              )}
            </Row>
          )
        })}
      </Outer>
    )
  }
}

export default graphql(LOADER)(Departments)
