import React from "react"
import { graphql } from "react-apollo"
import { app } from "../Root"
import { apolloClient } from "../../apollo"
import { getShortDateTimeString, getInitials } from "../../helpersGlobal"
import { stationTypes } from "../helpers"
import { LOADER, CREATE } from "./graphql"
import { SmartButton, SmartLink } from "../../UiHelpers"
import { Outer, Row, Type, TitleAndLogin, Login, Editors, Editor } from "./styles"

class Stations extends React.Component {
  fnCreate = () => {
    apolloClient.mutate({
      mutation: CREATE,
      refetchQueries: [{ query: LOADER }]
    })
  }

  render() {
    const {
      data: { loading, adminStations }
    } = this.props
    if (loading) return <Outer loading />

    const { userAdminLevel, userId } = app
    const userIsAdmin = userAdminLevel >= 1

    return (
      <Outer>
        {userIsAdmin && (
          <div style={{ textAlign: "right" }}>
            <SmartButton
              type={{ kind: "1", impression: "actionable" }}
              confirmImpression="alert"
              fnHandle={() => this.fnCreate()}
            >
              +starfsstöð
            </SmartButton>
          </div>
        )}

        {adminStations.map(
          ({
            id,
            lastUpdatedAt,
            lastUpdatedHours = (new Date() - new Date(lastUpdatedAt)) / 60 / 60e3,
            lastUpdatedBy,
            title,
            type,
            editors,
            stationType = stationTypes.find(dt => dt.id === type),
            userCanEditStation = editors.some(ed => ed.id === userId)
          }) => (
            <Row key={id}>
              <Type>{stationType ? stationType.label : ""}</Type>
              <TitleAndLogin
                title={
                  lastUpdatedAt &&
                  `${lastUpdatedAt.split("T")[0].substr(0, 10)} ${lastUpdatedAt
                    .split("T")[1]
                    .substr(0, 5)} (${lastUpdatedBy !== null && lastUpdatedBy.name})`
                }
              >
                <Login lastUpdatedHours={lastUpdatedHours}>
                  {lastUpdatedAt && `${getShortDateTimeString(lastUpdatedHours)}: ${getInitials(lastUpdatedBy.name)}`}
                </Login>

                <SmartLink
                  disabled={userCanEditStation ? false : !userIsAdmin}
                  style={!userCanEditStation && userIsAdmin ? { color: "LIGHTCORAL" } : null}
                  router={{ to: `/station/${id}` }}
                >
                  {title}
                </SmartLink>
              </TitleAndLogin>

              <Editors>
                {type !== "test" &&
                  editors.map(({ id: ed_Id, name: ed_Name }) => <Editor key={ed_Id}>{ed_Name}</Editor>)}
              </Editors>
            </Row>
          )
        )}
      </Outer>
    )
  }
}

export default graphql(LOADER)(Stations)
