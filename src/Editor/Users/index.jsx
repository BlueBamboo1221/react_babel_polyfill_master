import React from "react"
import { graphql } from "react-apollo"
import { apolloClient } from "../../apollo"
import Edit from "./Edit"
import { adminLevels } from "../../helpersGlobal"
import { SmartButton, SmartLink } from "../../UiHelpers"
import { LOADER, CREATE, DELETE } from "./graphql"
import { Outer, Row } from "../../stylesGlobal"
import { Ssn, AdminLevel, NameAndLogin, LastLogin, EditorForStations, StationTitle } from "./styles"

class Users extends React.Component {
  state = {
    editUserId: null
  }

  handleCreate = async () => {
    try {
      await apolloClient.mutate({
        mutation: CREATE,
        refetchQueries: [{ query: LOADER }]
      })
    } catch (e) {
      if (new RegExp("unique constraint").test(e.message)) {
        alert("kennitala 1111119999 er þegar til")
      }
    }
  }

  handleDelete = userId => {
    apolloClient.mutate({
      mutation: DELETE,
      variables: { userId },
      refetchQueries: [{ query: LOADER }]
    })
  }

  render() {
    const {
      data: { loading, adminUsers, allStations }
    } = this.props
    const { editUserId } = this.state
    if (loading) return <Outer loading />

    return (
      <Outer>
        <div style={{ textAlign: "right" }}>
          <SmartButton type={{ kind: "2", impression: "actionable" }} fnHandle={() => this.handleCreate()}>
            +notandi
          </SmartButton>
        </div>

        {adminUsers.map(user => {
          const {
            id: userId,
            latestLoginAt,
            latestLoginHours = Math.floor((new Date() - new Date(latestLoginAt)) / 60 / 60e3),
            ssn,
            name,
            adminLevel,
            editorForStations,
            adminLevelLabel = adminLevels.find(al => al.id === adminLevel).label
          } = user

          return (
            <Row key={userId} style={{ ...(ssn === "1111119999" && { backgroundColor: "RED", color: "YELLOW" }) }}>
              {editUserId !== userId ? (
                <React.Fragment>
                  <Ssn>{ssn}</Ssn>

                  <AdminLevel>{adminLevelLabel}</AdminLevel>

                  <NameAndLogin>
                    <SmartLink fnHandle={() => this.setState({ editUserId: userId })}>{name}</SmartLink>

                    <LastLogin latestLoginHours={latestLoginHours}>
                      {latestLoginAt && latestLoginAt.split("T")[0]}
                    </LastLogin>
                  </NameAndLogin>

                  <EditorForStations>
                    {editorForStations.filter(efs => efs.type !== "test").map(({ id: stationId, title }) => (
                      <StationTitle key={stationId}>{title}</StationTitle>
                    ))}
                  </EditorForStations>
                </React.Fragment>
              ) : (
                <Edit allStations={allStations} userData={user} fnDelete={this.handleDelete} />
              )}
            </Row>
          )
        })}
      </Outer>
    )
  }
}

export default graphql(LOADER)(Users)
