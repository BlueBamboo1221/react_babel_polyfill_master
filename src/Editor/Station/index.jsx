import React from "react"
import { app } from "../Root"
import { apolloClient } from "../../apollo"
import Edit from "./Edit"
import Categories from "./Categories"
import EditEntry from "./EditEntry"
import Unpublished from "./Unpublished"
import { Outer } from "../../stylesGlobal"
import { CATEGORIZEENTRYINSTATION, CREATEENTRYINSTATION, DELETEENTRYINSTATION } from "./graphql"

export default class Station extends React.Component {
  state = {
    editEntryId: null,
    otherStationId: null
  }

  fnCategorizeEntry = (actionType, categoryId, currentCategoryId, entryId) => {
    const {
      match: {
        params: { stationId }
      }
    } = this.props
    apolloClient.mutate({
      mutation: CATEGORIZEENTRYINSTATION,
      variables: { actionType, stationId, categoryId, currentCategoryId, entryId }
    })
  }

  fnCreateEntry = async () => {
    const {
      match: {
        params: { stationId }
      }
    } = this.props
    const {
      data: {
        createEntryForStation: { ownedEntries }
      }
    } = await apolloClient.mutate({
      mutation: CREATEENTRYINSTATION,
      variables: { stationId }
    })
    // TODO/4 will fail if more than 1x "" entries, needs smarter id fetching
    const editEntryId = (ownedEntries.find(oe => oe.title === "") || {}).id
    this.setState({ editEntryId: editEntryId || null })
  }

  fnDeleteEntry = () => {
    const {
      match: {
        params: { stationId }
      }
    } = this.props
    const { editEntryId: entryId } = this.state
    this.setState({ editEntryId: null }) // instant UI response
    apolloClient.mutate({
      mutation: DELETEENTRYINSTATION,
      variables: { entryId, stationId }
    })
  }

  render() {
    const {
      match: {
        params: { stationId }
      }
    } = this.props

    const { editEntryId, otherStationId } = this.state
    const { userAdminLevel } = app
    const userIsEditorForStation = true

    return (
      <Outer>
        <Edit
          stationId={stationId}
          userAdminLevel={userAdminLevel}
          userIsEditorForStation={userIsEditorForStation}
          fnDeleteEntry={this.fnDeleteEntry}
        />

        {editEntryId && (
          <EditEntry
            editEntryId={editEntryId}
            editStationId={stationId}
            userAdminLevel={userAdminLevel}
            userIsEditorForStation={userIsEditorForStation}
            fnDeleteEntry={this.fnDeleteEntry}
            fnSetStationState={fields => this.setState(fields)}
          />
        )}

        <Categories
          stationId={stationId}
          editEntryId={editEntryId}
          fnCategorizeEntry={this.fnCategorizeEntry}
          fnSetStationState={state => this.setState(state)}
        />

        <Unpublished
          stationId={otherStationId === null ? stationId : otherStationId}
          editStationId={stationId}
          editEntryId={editEntryId}
          fnCreateEntry={this.fnCreateEntry}
          fnSetStationState={state => this.setState(state)}
        />
      </Outer>
    )
  }
}
